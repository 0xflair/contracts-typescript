import { Provider } from '@ethersproject/providers';
import { ContractVersion } from '@flair-sdk/registry';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractAbi, useContractWriteAndWait } from '../../../../../common';
import { usePreSalePrice } from './usePreSalePrice';

type Config = {
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  enabled?: boolean;
  mintCount?: BigNumberish;
  allowlistProof?: BytesLike[];
};

type ArgsType = [mintCount: BigNumberish, allowlistProof: BytesLike[]];

export const usePreSaleMinter = ({
  chainId,
  contractVersion,
  contractAddress,
  signerOrProvider,
  enabled,
  mintCount,
  allowlistProof,
}: Config) => {
  const {
    data: preSalePrice,
    isLoading,
    error,
  } = usePreSalePrice({
    chainId,
    contractVersion,
    contractAddress,
    enabled,
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
      value:
        typeof preSalePrice !== 'undefined' && mintCount
          ? BigNumber.from(preSalePrice).mul(BigNumber.from(mintCount))
          : undefined,
    },
  });

  return {
    ...result,
    isLoading: result.isLoading || isLoading,
    error: result.error || error,
    data: {
      ...result.data,
      preSalePrice,
    },
  };
};
