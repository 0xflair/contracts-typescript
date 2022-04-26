import { Version } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider;
};

export const usePlaceholderUri = ({
  contractAddress,
  version,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead({
    version,
    contractKey:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    functionName: 'placeholderURI',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
