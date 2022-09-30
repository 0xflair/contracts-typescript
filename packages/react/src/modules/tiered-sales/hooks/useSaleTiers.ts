import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import { TieredSales } from '@flair-sdk/contracts';
import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useProvider } from 'wagmi';

import {
  PredefinedReadContractConfig,
  useContractManifest,
} from '../../../common';
import { Tier } from '../types';
import { useTieredSalesAllowlistChecker } from './useTieredSalesAllowlistChecker';
import { useTieredSalesEligibleAmount } from './useTieredSalesEligibleAmount';
import { useTieredSalesRemainingSupply } from './useTieredSalesRemainingSupply';

type ArgsType = [tierId: BigNumberish];

type Config = {
  env?: Environment;
  chainId?: number;
  contractAddress?: string;
  enabled?: boolean;
  minterAddress?: BytesLike;
} & PredefinedReadContractConfig<ArgsType>;

type TiersDictionary = Record<number, Tier>;

let requestPromise: Promise<TiersDictionary | undefined> | null;

export const useSaleTiers = ({
  env,
  chainId,
  contractAddress,
  enabled,
  minterAddress,
}: Config) => {
  const { call: checkAllowlist } = useTieredSalesAllowlistChecker({
    env,
    chainId,
    contractAddress,
    minterAddress,
    enabled: false,
  });

  const { call: getEligibleAmount } = useTieredSalesEligibleAmount({
    chainId,
    contractAddress,
    minterAddress,
    enabled: false,
  });

  const { call: getTierRemainingSupply } = useTieredSalesRemainingSupply({
    chainId,
    contractAddress,
    enabled: false,
  });

  const manifest = useContractManifest({
    contractReference: 'flair-sdk:finance/sales/ITieredSales',
  });
  const provider = useProvider({
    chainId,
  });
  const contract = useMemo(() => {
    if (!contractAddress || !provider || !manifest?.artifact?.abi) {
      return;
    }
    return new ethers.Contract(
      contractAddress,
      manifest?.artifact?.abi || [],
      provider,
    ) as TieredSales;
  }, [contractAddress, manifest?.artifact?.abi, provider]);

  const fetchTierById = useCallback(
    async (tierId: BigNumberish, forAddress?: BytesLike) => {
      if (!contract) {
        return;
      }

      const finalAddress = forAddress || minterAddress;
      const tier = (await contract.tiers(tierId)) as Tier;

      const now = new Date();

      const start =
        tier?.start !== undefined
          ? new Date(Number(tier?.start.toString()) * 1000)
          : undefined;
      const end =
        tier?.end !== undefined
          ? new Date(Number(tier?.end.toString()) * 1000)
          : undefined;
      const isActive = start && end ? start <= now && end > now : undefined;
      const hasAllowlist = tier?.merkleRoot
        ? tier.merkleRoot !== ZERO_BYTES32
        : undefined;

      const { isAllowlisted, merkleMetadata, merkleProof } = hasAllowlist
        ? await checkAllowlist({
            tierId,
            merkleRoot: tier.merkleRoot,
          })
        : ({} as any);

      const eligibleAmount =
        finalAddress && (merkleProof !== undefined || !hasAllowlist)
          ? await getEligibleAmount({
              tierId,
              minterAddress: finalAddress,
              maxAllowance: merkleMetadata?.maxAllowance,
              merkleProof,
            })
          : undefined;

      const remainingSupply = await getTierRemainingSupply(tierId);

      return {
        ...tier,
        isSavedOnChain: true,
        isActive,
        hasAllowlist,
        isAllowlisted,
        eligibleAmount,
        remainingSupply,
        isEligible:
          eligibleAmount !== undefined
            ? BigNumber.from(eligibleAmount).lt(0)
            : undefined,
        __forAddress: finalAddress,
      };
    },
    [
      contract,
      checkAllowlist,
      minterAddress,
      getEligibleAmount,
      getTierRemainingSupply,
    ],
  );

  const refetchTiers = useCallback(async (): Promise<
    TiersDictionary | undefined
  > => {
    const fetchedTiers: Record<number, Tier> = {};

    for (let i = 0, l = 10; i < l; i++) {
      const tier = await fetchTierById(i);

      if (
        tier &&
        tier.maxPerWallet &&
        Number(tier.maxPerWallet.toString()) > 0
      ) {
        fetchedTiers[i] = tier;
      } else {
        break;
      }
    }

    return fetchedTiers;
  }, [fetchTierById]);

  const queryFn = useCallback(async () => {
    if (!requestPromise) {
      requestPromise = refetchTiers();
    }
    const result = await requestPromise;
    requestPromise = null;
    return result;
  }, [refetchTiers]);

  // useEffect(() => {
  //   if (enabled && !error && contract && tiers === undefined) {
  //     refetchTiers();
  //   }
  // }, [
  //   enabled,
  //   contract,
  //   manifest?.artifact?.abi,
  //   minterAddress,
  //   error,
  //   tiers,
  //   refetchTiers,
  // ]);

  const queryKey = [{ type: 'tiers', chainId, contractAddress }];

  return useQuery<
    TiersDictionary | undefined,
    string | Error | null,
    TiersDictionary | undefined
  >(queryKey, queryFn, {
    enabled: Boolean(enabled && contract),
  });

  // return {
  //   data: tiers,
  //   error:
  //     error || allowlistCheckerError || eligibleAmountError || tierSupplyError,
  //   isLoading:
  //     isLoading ||
  //     allowlistCheckerLoading ||
  //     eligibleAmountLoading ||
  //     tierSupplyLoading,
  //   refetchTiers,
  // };
};
