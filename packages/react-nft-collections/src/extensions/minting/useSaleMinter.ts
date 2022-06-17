import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

import {
  usePreSaleAllowlistChecker,
  usePreSaleMinter,
  usePreSaleStatus,
  usePublicSaleMinter,
  usePublicSaleStatus,
} from '../sales';

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
    chainId,
    contractVersion,
    contractAddress,
  });

  const {
    data: publicSaleStatus,
    error: publicSaleStatusError,
    isLoading: publicSaleStatusLoading,
  } = usePublicSaleStatus({
    chainId,
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
    chainId,
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
    chainId,
    contractVersion,
    contractAddress,
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
              BigNumber.from(args?.mintCount)
            ),
          };
        }

        return preSaleMintWrite(
          [
            (args?.mintCount || mintCount) as BigNumberish,
            (args?.allowlistProof || allowlistProof) as BytesLike[],
          ],
          overrides
        );
      } else if (publicSaleStatus) {
        if (args?.mintCount) {
          overrides = {
            value: BigNumber.from(publicSaleMintData.publicSalePrice).mul(
              BigNumber.from(args?.mintCount)
            ),
          };
        }

        return publicSaleMintWrite(
          [
            account?.address as BytesLike,
            (args?.mintCount || mintCount) as BigNumberish,
          ],
          overrides
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
