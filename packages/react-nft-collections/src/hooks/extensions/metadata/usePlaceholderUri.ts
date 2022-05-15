import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const usePlaceholderUri = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead({
    contractVersion,
    contractFqn:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    functionName: 'placeholderURI',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
