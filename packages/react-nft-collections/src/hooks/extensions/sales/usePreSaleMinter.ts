import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';

import { usePreSalePrice } from './usePreSalePrice';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  mintCount?: BigNumberish;
  allowlistProof?: BytesLike[];
};

type ArgsType = [mintCount: BigNumberish, allowlistProof: BytesLike[]];

export const usePreSaleMinter = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  mintCount,
  allowlistProof,
}: Config) => {
  const {
    data: preSalePrice,
    isLoading,
    error,
  } = usePreSalePrice({
    contractVersion,
    contractAddress,
  });

  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
  });

  const result = useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'mintPreSale',
    contractAddress,
    signerOrProvider,
    args: [mintCount, allowlistProof] as ArgsType,
    overrides: {
      value: preSalePrice
        ? BigNumber.from(preSalePrice).mul(BigNumber.from(mintCount))
        : undefined,
    },
  });

  return {
    ...result,
    isLoading: result.isLoading || isLoading || !preSalePrice,
    error: result.error || error,
    data: {
      ...result.data,
      preSalePrice,
    },
  };
};
