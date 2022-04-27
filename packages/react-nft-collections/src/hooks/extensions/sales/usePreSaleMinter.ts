import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';

import { usePreSalePrice } from './usePreSalePrice';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  mintCount?: BigNumberish;
  allowlistProof?: BytesLike[];
};

type ArgsType = [mintCount: BigNumberish, allowlistProof: BytesLike[]];

export const usePreSaleMinter = ({
  version,
  contractAddress,
  signerOrProvider,
  mintCount,
  allowlistProof,
}: Config) => {
  const { data: preSalePrice } = usePreSalePrice({
    version,
    contractAddress,
  });

  const result = useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'mintPreSale',
    contractAddress,
    signerOrProvider,
    args: [mintCount, allowlistProof] as ArgsType,
    overrides: {
      value: BigNumber.from(preSalePrice).mul(BigNumber.from(mintCount)),
    },
  });

  return {
    ...result,
    data: {
      ...result.data,
      preSalePrice,
    },
  };
};
