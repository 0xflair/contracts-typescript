import { Version } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';

import { usePreSaleStatus, usePublicSaleStatus } from '../sales';
import { usePreSaleAllowlistChecker } from '../sales/usePreSaleAllowlistChecker';
import { usePreSaleMinter } from '../sales/usePreSaleMinter';
import { usePublicSaleMinter } from '../sales/usePublicSaleMinter';

type Config = {
  env?: Environment;
  chainId?: number;
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  minterAddress?: BytesLike;
  toAddress?: BytesLike;
  mintCount?: BigNumberish;
};

/**
 * Consolidated function for minting as collectors by paying price of pre-sale or public-sale.
 */
export const useSaleMinter = ({
  env,
  chainId,
  version,
  contractAddress,
  signerOrProvider,
  minterAddress,
  mintCount,
}: Config) => {
  const {
    data: preSaleStatus,
    error: preSaleStatusError,
    isLoading: preSaleStatusLoading,
  } = usePreSaleStatus({
    version,
    contractAddress,
    signerOrProvider,
  });

  const {
    data: publicSaleStatus,
    error: publicSaleStatusError,
    isLoading: publicSaleStatusLoading,
  } = usePublicSaleStatus({
    version,
    contractAddress,
    signerOrProvider,
  });

  const {
    data: { allowlistProof, isAllowlisted },
    error: allowlistCheckerError,
    isLoading: allowlistCheckerLoading,
  } = usePreSaleAllowlistChecker({
    env,
    chainId,
    contractAddress,
    version,
    enabled: true,
    minterAddress,
  });

  const {
    data: preSaleMintData,
    error: preSaleMintError,
    isLoading: preSaleMintLoading,
    writeAndWait: preSaleMintWrite,
  } = usePreSaleMinter({
    version,
    contractAddress,
    signerOrProvider,
    mintCount,
    allowlistProof,
  });

  const {
    data: publicSaleMintData,
    error: publicSaleMintError,
    isLoading: publicSaleMintLoading,
    writeAndWait: publicSaleMintWrite,
  } = usePublicSaleMinter({
    version,
    contractAddress,
    signerOrProvider,
    mintCount,
  });

  const mint = useCallback(
    (args?: { mintCount?: BigNumberish; allowlistProof?: BytesLike[] }) => {
      if (isAllowlisted && preSaleStatus) {
        preSaleMintWrite([
          (args?.mintCount || mintCount) as BigNumberish,
          (args?.allowlistProof || allowlistProof) as BytesLike[],
        ]);
      } else if (publicSaleStatus) {
        publicSaleMintWrite([(args?.mintCount || mintCount) as BigNumberish]);
      }
    },
    [
      allowlistProof,
      isAllowlisted,
      mintCount,
      preSaleMintWrite,
      preSaleStatus,
      publicSaleMintWrite,
      publicSaleStatus,
    ]
  );

  return {
    data: {
      txResponse: preSaleMintData.txResponse || publicSaleMintData.txResponse,
      txReceipt: preSaleMintData.txReceipt || publicSaleMintData.txReceipt,
      preSaleStatus,
      preSalePrice: preSaleMintData.preSalePrice,
      preSaleIsAllowlisted: isAllowlisted,
      publicSaleStatus,
      publicSalePrice: publicSaleMintData.publicSalePrice,
    },
    error:
      preSaleMintError ||
      publicSaleMintError ||
      preSaleStatusError ||
      publicSaleStatusError ||
      allowlistCheckerError,
    isLoading:
      preSaleMintLoading ||
      publicSaleMintLoading ||
      preSaleStatusLoading ||
      publicSaleStatusLoading ||
      allowlistCheckerLoading,
    mint,
  } as const;
};