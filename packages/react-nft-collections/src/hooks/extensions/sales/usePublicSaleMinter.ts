import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';

import { usePublicSalePrice } from './usePublicSalePrice';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  toAddress?: string;
  mintCount?: BigNumberish;
};

type ArgsType = [toAddress: BytesLike, mintCount: BigNumberish];

export const usePublicSaleMinter = ({
  version,
  contractAddress,
  signerOrProvider,
  toAddress,
  mintCount,
}: Config) => {
  const {
    data: publicSalePrice,
    error,
    isLoading,
  } = usePublicSalePrice({
    version,
    contractAddress,
  });

  const result = useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'mintPublicSale',
    contractAddress,
    signerOrProvider,
    args: [toAddress, mintCount] as ArgsType,
    overrides: {
      value:
        typeof publicSalePrice !== 'undefined'
          ? BigNumber.from(publicSalePrice).mul(BigNumber.from(mintCount))
          : undefined,
    },
  });

  return {
    ...result,
    isLoading: result.isLoading || isLoading || !publicSalePrice,
    error: result.error || error,
    data: {
      ...result.data,
      publicSalePrice,
    },
  };
};
