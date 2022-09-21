import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import { V1_ERC721TieringExtension__factory } from '@flair-sdk/registry';
import { BigNumberish, BytesLike } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';

import { PredefinedReadContractConfig } from '../../../../../common';
import { Tier } from '../types';
import { useTierSaleAllowlistChecker } from './useTierSaleAllowlistChecker';
import { useTierSaleEligibleAmount } from './useTierSaleEligibleAmount';

type ArgsType = [tierId: BigNumberish];

type Config = {
  env?: Environment;
  enabled?: boolean;
  minterAddress?: BytesLike;
} & PredefinedReadContractConfig<ArgsType>;

export const useSaleTiers = (config: Config) => {
  const [error, setError] = useState<Error | string>();
  const [isLoading, setIsLoading] = useState(false);
  const [tiers, setTiers] = useState<Record<number, Tier>>([]);

  const {
    error: allowlistCheckerError,
    isLoading: allowlistCheckerLoading,
    call: checkAllowlist,
  } = useTierSaleAllowlistChecker({
    env: config.env,
    chainId: config.chainId,
    contractAddress: config.contractAddress,
    minterAddress: config.minterAddress,
    enabled: false,
  });

  const {
    error: eligibleAmountError,
    isLoading: eligibleAmountLoading,
    call: getEligibleAmount,
  } = useTierSaleEligibleAmount({
    chainId: config.chainId,
    contractAddress: config.contractAddress,
    minterAddress: config.minterAddress,
    enabled: false,
  });

  const provider = useProvider({
    chainId: config.chainId,
  });
  const contract = useMemo(() => {
    if (!config.contractAddress || !provider) {
      return;
    }
    return V1_ERC721TieringExtension__factory.connect(
      config.contractAddress,
      provider,
    );
  }, [config.contractAddress, provider]);

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
    [contract, config.minterAddress],
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
  }, [config.minterAddress]);

  useEffect(() => {
    if (config.enabled && !isLoading && !error && tiers === undefined) {
      refetchTiers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.enabled, config.env, config.chainId, config.contractAddress]);

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
