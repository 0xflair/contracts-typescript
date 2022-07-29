import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';

import { usePublicSalePrice } from './usePublicSalePrice';

type Config = {
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  enabled?: boolean;
  toAddress?: string;
  mintCount?: BigNumberish;
};

type ArgsType = [toAddress: BytesLike, mintCount: BigNumberish];

export const usePublicSaleMinter = ({
  chainId,
  contractVersion,
  contractAddress,
  signerOrProvider,
  enabled,
  toAddress,
  mintCount,
}: Config) => {
  const {
    data: publicSalePrice,
    error,
    isLoading,
  } = usePublicSalePrice({
    chainId,
    contractVersion,
    contractAddress,
    enabled,
  });

  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
  });

  const result = useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'mintPublicSale',
    contractAddress,
    signerOrProvider,
    args: [toAddress, mintCount] as ArgsType,
    overrides: {
      value:
        typeof publicSalePrice !== 'undefined' && mintCount
          ? BigNumber.from(publicSalePrice).mul(BigNumber.from(mintCount))
          : undefined,
    },
  });

  return {
    ...result,
    isLoading: result.isLoading || isLoading,
    error: result.error || error,
    data: {
      ...result.data,
      publicSalePrice,
    },
  };
};
