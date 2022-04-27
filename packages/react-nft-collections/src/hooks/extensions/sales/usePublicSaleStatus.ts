import { Version } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const usePublicSaleStatus = ({
  version,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<boolean>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'publicSaleStatus',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
