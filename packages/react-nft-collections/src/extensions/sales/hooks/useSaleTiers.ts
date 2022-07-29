import { Environment } from '@0xflair/common';
import { loadContract } from '@0xflair/contracts-registry';
import {
  PredefinedReadContractConfig,
  useContractRead,
  useHasAnyOfFeatures,
} from '@0xflair/react-common';
import { readContract } from '@wagmi/core';
import { BigNumberish } from 'ethers';
import { useCallback, useMemo, useState } from 'react';

import { Tier } from '../types';

type ArgsType = [tierId: BigNumberish];

type Config = {
  env?: Environment;
  tierId?: BigNumberish;
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

  const tierReader = useContractRead<Tier, ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'tiers',
    enabled: false,
  });

  const fetchTierById = useCallback(
    async (tierId: BigNumberish) => {
      if (!config.contractAddress) {
        return;
      }

      const contractDefinition = loadContract(
        'collections/ERC721/extensions/ERC721TieringExtension',
        config.contractVersion,
      );
      const result = await readContract(
        {
          addressOrName: config.contractAddress,
          contractInterface: contractDefinition.artifact.abi,
        },
        'tiers',
        {
          args: [tierId],
          chainId: config.chainId,
        },
      );

      return { ...(result as unknown as Tier), isSavedOnChain: true };
    },
    [config.chainId, config.contractAddress, config.contractVersion],
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
    if (supportsSimpleSalesLoading || supportsTieredSalesLoading) return;
    refetchTiers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    supportsSimpleSales,
    supportsTieredSales,
    supportsSimpleSalesLoading,
    supportsTieredSalesLoading,
  ]);

  return {
    data: tiers,
    error:
      supportsSimpleSalesError || supportsTieredSalesError || tierReader.error,
    isLoading:
      isLoading ||
      supportsSimpleSalesLoading ||
      supportsTieredSalesLoading ||
      tierReader.isLoading,
    refetchTiers,
  };
};
