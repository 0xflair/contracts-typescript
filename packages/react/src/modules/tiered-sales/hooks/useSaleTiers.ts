import '@wagmi/core';

import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import { TieredSales } from '@flair-sdk/contracts';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useProvider } from 'wagmi';

import {
  PredefinedReadContractConfig,
  useContractManifest,
} from '../../../common';
import { Tier, TiersDictionary } from '../types';
import { normalizeTiers } from '../util';
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

  const queryKey = [
    {
      type: 'tiers',
      chainId,
      contractAddress,
      minterAddress,
    },
  ] as const;

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
            ? BigNumber.from(eligibleAmount).gt(0)
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

  const refetchTiers = useCallback(
    async (
      args: QueryFunctionContext<any>,
    ): Promise<TiersDictionary | undefined> => {
      const fetchedTiers: Record<number, Tier> = {};

      for (let i = 0, l = 10; i < l; i++) {
        const tier = await fetchTierById(i, args.queryKey[0].minterAddress);

        if (
          tier &&
          tier.maxPerWallet &&
          Number(tier.maxPerWallet.toString()) > 0
        ) {
          fetchedTiers[i] = tier;
        }
      }

      return fetchedTiers;
    },
    [fetchTierById],
  );

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

  const result = useQuery<
    TiersDictionary | undefined,
    string | Error | null,
    TiersDictionary | undefined
  >(queryKey, refetchTiers, {
    enabled: Boolean(enabled && contract),
    cacheTime: 20,
    staleTime: 2,
  });

  return {
    ...result,
    data: normalizeTiers(result.data),
    isLoading: result.isLoading && result?.fetchStatus !== 'idle',
  };
};
