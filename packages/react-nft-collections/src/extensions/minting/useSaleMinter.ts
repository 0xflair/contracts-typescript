import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment, useHasAnyOfFeatures } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';

import { useSimpleSaleMinter } from '../sales/hooks/useSimpleSaleMinter';
import { useTierSaleMinter } from '../sales/hooks/useTierSaleMinter';

type Config = {
  env?: Environment;
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  tierId?: BigNumberish;
  minterAddress?: BytesLike;
  mintCount?: BigNumberish;
};

/**
 * Consolidated function for sales minting (supports both simple and tiered sales).
 */
export const useSaleMinter = ({
  env,
  chainId,
  contractVersion,
  contractAddress,
  signerOrProvider,
  tierId,
  minterAddress,
  mintCount,
}: Config) => {
  const {
    data: supportsSimpleSales,
    error: supportsSimpleSalesError,
    isLoading: supportsSimpleSalesLoading,
  } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress,
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
    env,
    chainId,
    contractAddress,
    tags: ['erc721_tiering_extension', 'mint_by_tier_with_allowance_and_proof'],
  });

  const loadingSaleType =
    supportsSimpleSalesLoading || supportsTieredSalesLoading;

  const {
    data: simpleSaleData,
    error: simpleSaleError,
    isLoading: simpleSaleLoading,
    mint: simpleMint,
  } = useSimpleSaleMinter({
    env,
    chainId,
    contractAddress,
    contractVersion,
    mintCount,
    minterAddress,
    signerOrProvider,
    enabled: !loadingSaleType && supportsSimpleSales,
  });

  const {
    data: tierSaleData,
    error: tierSaleError,
    isLoading: tierSaleLoading,
    mint: tierMint,
  } = useTierSaleMinter({
    env,
    chainId,
    contractAddress,
    contractVersion,
    mintCount,
    minterAddress,
    signerOrProvider,
    tierId,
    enabled: !loadingSaleType && supportsTieredSales,
  });

  const mint = useCallback(
    (args?: { mintCount: BigNumberish }) => {
      if (supportsSimpleSales) {
        return simpleMint(args);
      } else if (supportsTieredSales) {
        return tierMint(args);
      }
    },
    [supportsSimpleSales, simpleMint, supportsTieredSales, tierMint]
  );

  return {
    data: supportsTieredSales
      ? {
          /**
           * Tiered Sales
           */

          // Transaction
          txReceipt: tierSaleData.txReceipt,
          txResponse: tierSaleData.txResponse,

          // Common Info
          start: tierSaleData.start,
          end: tierSaleData.end,
          price: tierSaleData.price,
          isActive: tierSaleData.isActive,
          hasAllowlist: tierSaleData.hasAllowlist,

          // Account-specific Info
          isAllowlisted: tierSaleData.isAllowlisted,
          isEligible: tierSaleData.isEligible,
          eligibleAmount: tierSaleData.eligibleAmount,
        }
      : {
          /**
           * Simple Sales
           */

          // Transaction
          txReceipt: simpleSaleData.txReceipt,
          txResponse: simpleSaleData.txResponse,

          // Common Info (for simple sales we assume pre-sale is tier 0 and public-sale is tier 1)
          start: undefined,
          end: undefined,
          price:
            tierId?.toString() === '0'
              ? simpleSaleData.preSalePrice
              : simpleSaleData.publicSalePrice,
          isActive:
            tierId?.toString() === '0'
              ? simpleSaleData.preSaleStatus
              : simpleSaleData.publicSaleStatus,
          hasAllowlist: tierId?.toString() === '0' ? true : false,

          // Account-specific Info
          isAllowlisted:
            tierId?.toString() === '0'
              ? simpleSaleData.preSaleIsAllowlisted
              : undefined,
          isEligible:
            tierId?.toString() === '0'
              ? simpleSaleData.preSaleStatus &&
                simpleSaleData.preSaleIsAllowlisted
              : simpleSaleData.publicSaleStatus,
          eligibleAmount:
            tierId?.toString() === '0'
              ? Number(simpleSaleData.preSaleMaxMintPerWallet?.toString())
              : Number(simpleSaleData.publicSaleMaxMintPerTx?.toString()),
        },
    error: supportsTieredSales
      ? supportsTieredSalesError ||
        // Tiered Sales
        tierSaleError.allowlistCheckerError ||
        tierSaleError.eligibleAmountError ||
        tierSaleError.mintError ||
        tierSaleError.tierError
      : supportsSimpleSalesError ||
        // Simple Sales
        simpleSaleError.preSaleAllowlistCheckerError ||
        simpleSaleError.preSaleStatusError ||
        simpleSaleError.preSaleMintError ||
        simpleSaleError.publicSaleStatusError ||
        simpleSaleError.publicSaleMintError,
    isLoading: supportsTieredSales
      ? // Common
        supportsTieredSalesLoading ||
        // Tiered Sales
        tierSaleLoading.allowlistCheckerLoading ||
        tierSaleLoading.eligibleAmountLoading ||
        tierSaleLoading.mintLoading ||
        tierSaleLoading.tierLoading
      : // Common
        supportsSimpleSalesLoading ||
        // Simple Sales
        simpleSaleLoading.preSaleAllowlistCheckerLoading ||
        simpleSaleLoading.preSaleStatusLoading ||
        simpleSaleLoading.preSaleMintLoading ||
        simpleSaleLoading.publicSaleStatusLoading ||
        simpleSaleLoading.publicSaleMintLoading,
    mint,
  } as const;
};
