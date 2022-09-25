import { Provider } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { ContractVersion } from '@flair-sdk/registry';
import { BigNumberish, BytesLike, Signer } from 'ethers';

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
 * Consolidated function for sales minting
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
    data: tierSaleData,
    error: tierSaleError,
    isLoading: tierSaleLoading,
    mint,
  } = useTierSaleMinter({
    env,
    chainId,
    contractAddress,
    contractVersion,
    mintCount,
    minterAddress,
    signerOrProvider,
    tierId,
  });

  return {
    data: {
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
    },
    error:
      tierSaleError.allowlistCheckerError ||
      tierSaleError.eligibleAmountError ||
      tierSaleError.mintError ||
      tierSaleError.tierError,
    isLoading:
      tierSaleLoading.allowlistCheckerLoading ||
      tierSaleLoading.eligibleAmountLoading ||
      tierSaleLoading.mintLoading ||
      tierSaleLoading.tierLoading,
    mint,
  } as const;
};
