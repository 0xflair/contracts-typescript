import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useCollectionMetadataUri = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<string>({
    contractVersion,
    contractFqn:
      'collections/ERC721/extensions/ERC721CollectionMetadataExtension',
    functionName: 'contractURI',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
