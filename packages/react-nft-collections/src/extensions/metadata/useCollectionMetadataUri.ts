import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';

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
