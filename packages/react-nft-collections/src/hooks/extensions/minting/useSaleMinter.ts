import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { usePreSaleStatus, usePublicSaleStatus } from '../sales';
import { usePreSaleAllowlistChecker } from '../sales/usePreSaleAllowlistChecker';
import { usePreSaleMinter } from '../sales/usePreSaleMinter';
import { usePublicSaleMinter } from '../sales/usePublicSaleMinter';

type Config = {
  env?: Environment;
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  minterAddress?: BytesLike;
  mintCount?: BigNumberish;
};

/**
 * Consolidated function for minting as collectors by paying price of pre-sale or public-sale.
 */
export const useSaleMinter = ({
  env,
  chainId,
  contractVersion,
  contractAddress,
  signerOrProvider,
  minterAddress,
  mintCount,
}: Config) => {
  const { data: account } = useAccount();

  const {
    data: preSaleStatus,
    error: preSaleStatusError,
    isLoading: preSaleStatusLoading,
  } = usePreSaleStatus({
    contractVersion,
    contractAddress,
  });

  const {
    data: publicSaleStatus,
    error: publicSaleStatusError,
    isLoading: publicSaleStatusLoading,
  } = usePublicSaleStatus({
    contractVersion,
    contractAddress,
  });

  const {
    data: { allowlistProof, isAllowlisted },
    error: allowlistCheckerError,
    isLoading: allowlistCheckerLoading,
  } = usePreSaleAllowlistChecker({
    env,
    chainId,
    contractVersion,
    contractAddress,
    enabled: true,
    minterAddress,
  });

  const {
    data: preSaleMintData,
    error: preSaleMintError,
    isLoading: preSaleMintLoading,
    writeAndWait: preSaleMintWrite,
  } = usePreSaleMinter({
    contractVersion,
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
    contractVersion,
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
        publicSaleMintWrite([
          account?.address as BytesLike,
          (args?.mintCount || mintCount) as BigNumberish,
        ]);
      }
    },
    [
      account?.address,
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
