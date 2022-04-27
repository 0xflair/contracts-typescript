import { Version } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const usePreSalePrice = ({
  version,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSalePrice',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
