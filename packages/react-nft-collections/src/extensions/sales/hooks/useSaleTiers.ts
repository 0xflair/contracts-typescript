import { Environment } from '@0xflair/common';
import { loadContract } from '@0xflair/contracts-registry';
import { ERC721TieringExtension__factory } from '@0xflair/evm-contracts';
import {
  PredefinedReadContractConfig,
  useContractRead,
  useHasAnyOfFeatures,
} from '@0xflair/react-common';
import { readContract } from '@wagmi/core';
import { BigNumberish } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';

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

  const provider = useProvider({
    chainId: config.chainId,
  });
  const contract = useMemo(() => {
    if (!config.contractAddress || !provider) {
      return;
    }
    return ERC721TieringExtension__factory.connect(
      config.contractAddress,
      provider,
    );
  }, [config.contractAddress, provider]);

  const fetchTierById = useCallback(
    async (tierId: BigNumberish) => {
      if (!contract) {
        return;
      }

      const result = await contract.tiers(tierId);

      return { ...(result as Tier), isSavedOnChain: true };
    },
    [contract],
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
