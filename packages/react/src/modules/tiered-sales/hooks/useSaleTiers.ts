import '@wagmi/core';

import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers';
import { useCallback } from 'react';

import { PredefinedReadContractConfig } from '../../../common';
import { Tier, TiersDictionary } from '../types';
import { useSaleTiersConfigs } from './useSaleTiersConfigs';
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

  const {
    data: tiersConfigs,
    isLoading: tiersConfigsLoading,
    error: tiersConfigsError,
  } = useSaleTiersConfigs({
    chainId,
    contractAddress,
    enabled,
  });

  const queryKey = [
    {
      type: 'tiers',
      chainId,
      contractAddress,
      minterAddress,
    },
  ] as const;

  const enrichTierById = useCallback(
    async (tierId: BigNumberish, forAddress?: BytesLike) => {
      if (!tiersConfigs || !tiersConfigs[tierId.toString()]) {
        return;
      }

      const finalAddress = forAddress || minterAddress;
      const tier = tiersConfigs[tierId.toString()];

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
      tiersConfigs,
      minterAddress,
      checkAllowlist,
      getEligibleAmount,
      getTierRemainingSupply,
    ],
  );

  const enrichAllTiers = useCallback(
    async (
      args: QueryFunctionContext<any>,
    ): Promise<TiersDictionary | undefined> => {
      const enrichedTiers: Record<string, Tier> = {};

      for (const tierId in tiersConfigs) {
        const tier = await enrichTierById(
          tierId,
          args.queryKey[0].minterAddress,
        );

        if (
          tier &&
          tier.maxPerWallet &&
          Number(tier.maxPerWallet.toString()) > 0
        ) {
          enrichedTiers[tierId] = tier;
        }
      }

      return enrichedTiers;
    },
    [enrichTierById, tiersConfigs],
  );

  const result = useQuery<
    TiersDictionary | undefined,
    string | Error | null,
    TiersDictionary | undefined
  >(queryKey, enrichAllTiers, {
    enabled: Boolean(enabled && tiersConfigs && !tiersConfigsLoading),
    cacheTime: 20,
    staleTime: 2,
  });

  return {
    ...result,
    error: tiersConfigsError || result.error,
    isLoading: result.isLoading && result?.fetchStatus !== 'idle',
  } as const;
};
