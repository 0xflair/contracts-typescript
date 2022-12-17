import '@wagmi/core';

import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import {
  QueryFunctionContext,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { BigNumber, BigNumberish, BytesLike } from 'ethers';
import { useCallback, useEffect, useMemo } from 'react';

import { PredefinedReadContractConfig } from '../../../../common';
import { useMergeQueryStates } from '../../../../core/utils/useMergeQueryStates';
import { Tier, TiersDictionary } from '../types';
import { useSaleTiersConfigs } from './useSaleTiersConfigs';
import { useTieredSalesAllowlistChecker } from './useTieredSalesAllowlistChecker';
import { useTieredSalesEligibleAmount } from './useTieredSalesEligibleAmount';
import { useTieredSalesRemainingSupply } from './useTieredSalesRemainingSupply';

type ArgsType = [tierId: BigNumberish];

type Config = {
  env?: Environment;
  chainId?: number;
  contractAddress?: `0x${string}`;
  enabled?: boolean;
  minterAddress?: BytesLike;
} & PredefinedReadContractConfig<ArgsType>;

export const useSaleTiers = ({
  env,
  chainId,
  contractAddress,
  enabled,
  minterAddress,
  ...restOfConfig
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
    refetch: refetchConfigs,
    ...tiersConfigsQuery
  } = useSaleTiersConfigs({
    chainId,
    contractAddress,
    enabled,
    cacheTime: 24 * 60 * 60 * 1000,
    staleTime: 0,
    cacheOnBlock: false,
    ...restOfConfig,
  });

  const queryKey = useMemo(
    () =>
      [
        {
          type: 'tiers',
          chainId,
          contractAddress,
          minterAddress,
        },
      ] as const,
    [chainId, contractAddress, minterAddress],
  );

  const enrichTierById = useCallback(
    async (
      tierId: BigNumberish,
      forAddress?: BytesLike,
    ): Promise<Tier | undefined> => {
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

      const checkAllowlistPromise = hasAllowlist
        ? checkAllowlist({
            tierId,
            merkleRoot: tier.merkleRoot,
          })
        : ({} as any);

      const remainingSupplyPromise = getTierRemainingSupply(tierId);

      const [{ isAllowlisted, merkleMetadata, merkleProof }, remainingSupply] =
        await Promise.all([checkAllowlistPromise, remainingSupplyPromise]);

      let eligibleAmount;

      try {
        eligibleAmount =
          finalAddress && (merkleProof !== undefined || !hasAllowlist)
            ? await getEligibleAmount({
                args: [
                  tierId,
                  finalAddress,
                  merkleMetadata?.maxAllowance || 1,
                  merkleProof || [],
                ],
              })
            : undefined;
      } catch (e) {
        console.warn(`Error when fetching eligible amount: `, e);
      }

      return {
        ...tier,
        isSavedOnChain: true,
        isActive,
        hasAllowlist,
        isAllowlisted,
        eligibleAmount: eligibleAmount ? eligibleAmount.toString() : undefined,
        remainingSupply: remainingSupply
          ? remainingSupply.toString()
          : undefined,
        isEligible:
          eligibleAmount !== undefined
            ? BigNumber.from(eligibleAmount).gt(0)
            : undefined,
        minterAddress: finalAddress,
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
      const tierIds: string[] = [];
      const promises: Promise<Tier | undefined>[] = [];

      for (const tierId in tiersConfigs) {
        tierIds.push(tierId);
        promises.push(enrichTierById(tierId, args.queryKey[0].minterAddress));
      }

      const resolvedTiers = await Promise.all(promises);

      for (let i = 0, len = tierIds.length; i < len; i++) {
        const tier = resolvedTiers[i];
        if (
          tier &&
          tier.maxPerWallet &&
          Number(tier.maxPerWallet.toString()) > 0
        ) {
          enrichedTiers[tierIds[i]] = tier;
        }
      }

      return enrichedTiers;
    },
    [enrichTierById, tiersConfigs],
  );

  const saleTiersQuery = useQuery<
    TiersDictionary | undefined,
    string | Error | null,
    TiersDictionary | undefined
  >(queryKey, enrichAllTiers, {
    enabled: Boolean(
      enabled &&
        tiersConfigs &&
        !tiersConfigsQuery.isLoading &&
        tiersConfigsQuery.fetchStatus === 'idle',
    ),
    cacheTime: 24 * 60 * 60 * 1000,
    staleTime: 0,
    ...restOfConfig,
  });

  const queryClient = useQueryClient();
  const mergedStates = useMergeQueryStates([saleTiersQuery, tiersConfigsQuery]);

  const refetch = useCallback(async () => {
    if (restOfConfig.cacheTime === 0) {
      await queryClient.invalidateQueries(queryKey);
    }
    return refetchConfigs().then((result) => {
      return saleTiersQuery.refetch();
    });
  }, [
    queryClient,
    queryKey,
    refetchConfigs,
    restOfConfig.cacheTime,
    saleTiersQuery,
  ]);

  useEffect(() => {
    if (enabled) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return {
    ...tiersConfigsQuery,
    ...mergedStates,
    data: saleTiersQuery.data,
    isLoading: mergedStates.isLoading || mergedStates?.fetchStatus !== 'idle',
    refetch,
  } as const;
};
