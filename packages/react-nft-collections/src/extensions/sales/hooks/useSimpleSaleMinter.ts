import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { usePreSaleAllowlistChecker } from './usePreSaleAllowlistChecker';
import { usePreSaleMaxMintPerWallet } from './usePreSaleMaxMintPerWallet';
import { usePreSaleMinter } from './usePreSaleMinter';
import { usePreSaleStatus } from './usePreSaleStatus';
import { usePublicSaleMaxMintPerTx } from './usePublicSaleMaxMintPerTx';
import { usePublicSaleMinter } from './usePublicSaleMinter';
import { usePublicSaleStatus } from './usePublicSaleStatus';

type Config = {
  env?: Environment;
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  minterAddress?: BytesLike;
  mintCount?: BigNumberish;
  enabled?: boolean;
};

/**
 * Consolidated function for minting as collectors by paying price of pre-sale or public-sale.
 */
export const useSimpleSaleMinter = ({
  env,
  chainId,
  contractVersion,
  contractAddress,
  signerOrProvider,
  minterAddress,
  mintCount,
  enabled,
}: Config) => {
  const { data: account } = useAccount();

  const {
    data: preSaleStatus,
    error: preSaleStatusError,
    isLoading: preSaleStatusLoading,
  } = usePreSaleStatus({
    chainId,
    contractVersion,
    contractAddress,
    enabled,
  });

  const {
    data: preSaleMaxMintPerWallet,
    error: preSaleMaxMintPerWalletError,
    isLoading: preSaleMaxMintPerWalletLoading,
  } = usePreSaleMaxMintPerWallet({
    chainId,
    contractVersion,
    contractAddress,
    enabled,
  });

  const {
    data: publicSaleStatus,
    error: publicSaleStatusError,
    isLoading: publicSaleStatusLoading,
  } = usePublicSaleStatus({
    chainId,
    contractVersion,
    contractAddress,
    enabled,
  });

  const {
    data: publicSaleMaxMintPerTx,
    error: publicSaleMaxMintPerTxError,
    isLoading: publicSaleMaxMintPerTxLoading,
  } = usePublicSaleMaxMintPerTx({
    chainId,
    contractVersion,
    contractAddress,
    enabled,
  });

  const {
    data: { allowlistProof, allowlistMetadata, isAllowlisted },
    error: allowlistCheckerError,
    isLoading: allowlistCheckerLoading,
  } = usePreSaleAllowlistChecker({
    env,
    chainId,
    contractVersion,
    contractAddress,
    enabled,
    minterAddress,
  });

  const {
    data: preSaleMintData,
    error: preSaleMintError,
    isLoading: preSaleMintLoading,
    writeAndWait: preSaleMintWrite,
  } = usePreSaleMinter({
    chainId,
    contractVersion,
    contractAddress,
    enabled,
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
    chainId,
    contractVersion,
    contractAddress,
    enabled,
    signerOrProvider,
    mintCount,
  });

  const mint = useCallback(
    (args?: { mintCount: BigNumberish; allowlistProof?: BytesLike[] }) => {
      let overrides;

      if (isAllowlisted && preSaleStatus) {
        if (args?.mintCount) {
          overrides = {
            value: BigNumber.from(preSaleMintData.preSalePrice).mul(
              BigNumber.from(args?.mintCount),
            ),
          };
        }

        return preSaleMintWrite(
          [
            (args?.mintCount || mintCount) as BigNumberish,
            (args?.allowlistProof || allowlistProof) as BytesLike[],
          ],
          overrides,
        );
      } else if (publicSaleStatus) {
        if (args?.mintCount) {
          overrides = {
            value: BigNumber.from(publicSaleMintData.publicSalePrice).mul(
              BigNumber.from(args?.mintCount),
            ),
          };
        }

        return publicSaleMintWrite(
          [
            account?.address as BytesLike,
            (args?.mintCount || mintCount) as BigNumberish,
          ],
          overrides,
        );
      }
    },
    [
      account?.address,
      allowlistProof,
      isAllowlisted,
      mintCount,
      preSaleMintData.preSalePrice,
      preSaleMintWrite,
      preSaleStatus,
      publicSaleMintData.publicSalePrice,
      publicSaleMintWrite,
      publicSaleStatus,
    ],
  );

  return {
    data: {
      txResponse: preSaleMintData.txResponse || publicSaleMintData.txResponse,
      txReceipt: preSaleMintData.txReceipt || publicSaleMintData.txReceipt,
      preSaleStatus,
      preSalePrice: preSaleMintData.preSalePrice,
      preSaleIsAllowlisted: isAllowlisted,
      preSaleAllowlistProof: allowlistProof,
      preSaleAllowlistMetadata: allowlistMetadata,
      preSaleMaxMintPerWallet,
      publicSaleStatus,
      publicSalePrice: publicSaleMintData.publicSalePrice,
      publicSaleMaxMintPerTx,
    },
    error: {
      preSaleStatusError,
      preSaleMintError,
      preSaleAllowlistCheckerError: allowlistCheckerError,
      preSaleMaxMintPerWalletError,
      publicSaleStatusError,
      publicSaleMintError,
      publicSaleMaxMintPerTxError,
    },
    isLoading: {
      preSaleStatusLoading,
      preSaleMintLoading,
      preSaleAllowlistCheckerLoading: allowlistCheckerLoading,
      preSaleMaxMintPerWalletLoading,
      publicSaleStatusLoading,
      publicSaleMintLoading,
      publicSaleMaxMintPerTxLoading,
    },
    mint,
  } as const;
};
