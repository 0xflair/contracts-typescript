import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';

export const useBaseTokenUri = (config: PredefinedReadContractConfig) => {
  return useContractRead({
    contractFqn:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    functionName: 'baseTokenURI',
    ...config,
  });
};
