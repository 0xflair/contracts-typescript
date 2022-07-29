import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';

export const useCollectionMetadataUri = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<string>({
    contractFqn:
      'collections/ERC721/extensions/ERC721CollectionMetadataExtension',
    functionName: 'contractURI',
    ...config,
  });
};
