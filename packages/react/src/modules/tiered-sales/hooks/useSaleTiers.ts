import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import { TieredSales } from '@flair-sdk/contracts';
import { BigNumberish, BytesLike, ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';

import {
  PredefinedReadContractConfig,
  useContractManifest,
} from '../../../common';
import { Tier } from '../types';
import { useTieredSalesAllowlistChecker } from './useTieredSalesAllowlistChecker';
import { useTieredSalesEligibleAmount } from './useTieredSalesEligibleAmount';

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
  const [error, setError] = useState<Error | string>();
  const [isLoading, setIsLoading] = useState(false);
  const [tiers, setTiers] = useState<Record<number, Tier>>({});

  const {
    error: allowlistCheckerError,
    isLoading: allowlistCheckerLoading,
    call: checkAllowlist,
  } = useTieredSalesAllowlistChecker({
    env,
    chainId,
    contractAddress,
    minterAddress,
    enabled: false,
  });

  const {
    error: eligibleAmountError,
    isLoading: eligibleAmountLoading,
    call: getEligibleAmount,
  } = useTieredSalesEligibleAmount({
    chainId,
    contractAddress,
    minterAddress,
    enabled: false,
  });

  const manifest = useContractManifest({
    contractReference: 'flair-sdk:finance/sales/ITieredSales',
  });
  const provider = useProvider({
    chainId,
  });
  const contract = useMemo(() => {
    if (!contractAddress || !provider || manifest?.artifact?.abi) {
      return;
    }
    return new ethers.Contract(
      contractAddress,
      manifest?.artifact?.abi || [],
      provider,
    ) as TieredSales;
  }, [contractAddress, manifest?.artifact?.abi, provider]);

  const fetchTierById = useCallback(
    async (tierId: BigNumberish) => {
      if (!contract) {
        return;
      }

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

      const { isAllowlisted, merkleMetadata, merkleProof } =
        isActive && hasAllowlist
          ? await checkAllowlist({
              tierId,
              merkleRoot: tier.merkleRoot,
            })
          : ({} as any);

      const eligibleAmount = isActive
        ? await getEligibleAmount({
            tierId,
            maxAllowance: merkleMetadata?.maxAllowance,
            merkleProof,
          })
        : undefined;

      return {
        ...tier,
        isSavedOnChain: true,
        isActive,
        hasAllowlist,
        isAllowlisted,
        eligibleAmount,
        isEligible:
          eligibleAmount !== undefined
            ? Boolean(
                !eligibleAmountError && Number(eligibleAmount.toString()) > 0,
              )
            : undefined,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contract, minterAddress],
  );

  const refetchTiers = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
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

      setTiers(fetchedTiers);
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minterAddress]);

  useEffect(() => {
    if (
      enabled &&
      !isLoading &&
      !error &&
      (!tiers || !Object.keys(tiers).length)
    ) {
      refetchTiers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, env, chainId, contractAddress]);

  return {
    data: tiers,
    error:
      // top-level
      error ||
      // tiered sales
      allowlistCheckerError ||
      eligibleAmountError,
    isLoading:
      // top-level
      isLoading ||
      // tiered sales
      allowlistCheckerLoading ||
      eligibleAmountLoading,
    refetchTiers,
  };
};
