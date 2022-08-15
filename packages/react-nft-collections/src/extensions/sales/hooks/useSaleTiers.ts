import { Environment } from '@0xflair/common';
import { V1_19_ERC721TieringExtension__factory } from '@0xflair/contracts-registry';
import {
  PredefinedReadContractConfig,
  useHasAnyOfFeatures,
  ZERO_BYTES32,
} from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';

import { Tier } from '../types';
import { useTierSaleAllowlistChecker } from './useTierSaleAllowlistChecker';
import { useTierSaleEligibleAmount } from './useTierSaleEligibleAmount';

type ArgsType = [tierId: BigNumberish];

type Config = {
  env?: Environment;
  minterAddress?: BytesLike;
} & PredefinedReadContractConfig<ArgsType>;

export const useSaleTiers = (config: Config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tiers, setTiers] = useState<Record<number, Tier>>([]);

  const {
    data: supportsSimpleSales,
    error: supportsSimpleSalesError,
    isLoading: supportsSimpleSalesLoading,
  } = useHasAnyOfFeatures({
    env: config.env,
    chainId: config.chainId,
    contractAddress: config.contractAddress,
    tags: [
      'erc721_public_sale_extension',
      'erc721_presale_extension',
      'mint_amount_by_merkle_proof',
    ],
  });

  const {
    data: supportsTieredSales,
    error: supportsTieredSalesError,
    isLoading: supportsTieredSalesLoading,
  } = useHasAnyOfFeatures({
    env: config.env,
    chainId: config.chainId,
    contractAddress: config.contractAddress,
    tags: ['erc721_tiering_extension', 'mint_by_tier_with_allowance_and_proof'],
  });

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
    data: eligibleAmount,
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
    return V1_19_ERC721TieringExtension__factory.connect(
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
    if (supportsTieredSales) {
      const fetchedTiers: Record<number, Tier> = {};

      setIsLoading(true);
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

      setIsLoading(false);
      setTiers(fetchedTiers);
    } else if (supportsSimpleSales) {
      setTiers({
        0: {} as Tier,
        1: {} as Tier,
      });
      setIsLoading(false);
    }
  }, [fetchTierById, supportsSimpleSales, supportsTieredSales]);

  useMemo(() => {
    if (supportsSimpleSalesLoading || supportsTieredSalesLoading) {
      return;
    }

    refetchTiers();
  }, [supportsSimpleSalesLoading, supportsTieredSalesLoading, refetchTiers]);

  return {
    data: tiers,
    error: supportsSimpleSalesError || supportsTieredSalesError,
    isLoading:
      isLoading || supportsSimpleSalesLoading || supportsTieredSalesLoading,
    refetchTiers,
  };
};
