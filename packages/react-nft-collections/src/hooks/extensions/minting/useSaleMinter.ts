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
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
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
  contractAddress,
  version,
  signerOrProvider,
  minterAddress,
  mintCount,
}: Config) => {
  const [
    {
      data: preSaleStatus,
      error: preSaleStatusError,
      loading: preSaleStatusLoading,
    },
  ] = usePreSaleStatus({
    contractAddress,
    version,
    signerOrProvider,
  });

  const [
    {
      data: publicSaleStatus,
      error: publicSaleStatusError,
      loading: publicSaleStatusLoading,
    },
  ] = usePublicSaleStatus({
    contractAddress,
    version,
    signerOrProvider,
  });

  const [
    {
      data: { allowlistProof, isAllowlisted },
      error: allowlistCheckerError,
      loading: allowlistCheckerLoading,
    },
  ] = usePreSaleAllowlistChecker({
    env,
    chainId,
    contractAddress,
    version,
    skip: false,
    minterAddress,
  });

  const [
    {
      data: preSaleMintData,
      error: preSaleMintError,
      loading: preSaleMintLoading,
    },
    preSaleMintWrite,
  ] = usePreSaleMinter({
    contractAddress,
    version,
    signerOrProvider,
    mintCount,
    allowlistProof,
  });

  const [
    {
      data: publicSaleMintData,
      error: publicSaleMintError,
      loading: publicSaleMintLoading,
    },
    publicSaleMintWrite,
  ] = usePublicSaleMinter({
    contractAddress,
    version,
    signerOrProvider,
    mintCount,
  });

  const mint = useCallback(
    (args?: { mintCount?: BigNumberish; allowlistProof?: BytesLike[] }) => {
      if (isAllowlisted && preSaleStatus) {
        preSaleMintWrite({
          mintCount: args?.mintCount || mintCount,
          allowlistProof: args?.allowlistProof || allowlistProof,
        });
      } else if (publicSaleStatus) {
        publicSaleMintWrite({
          mintCount: args?.mintCount || mintCount,
        });
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

  return [
    {
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
      loading:
        preSaleMintLoading ||
        publicSaleMintLoading ||
        preSaleStatusLoading ||
        publicSaleStatusLoading ||
        allowlistCheckerLoading,
    },
    mint,
  ] as const;
};
