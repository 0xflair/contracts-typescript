import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const usePlaceholderUri = (config: PredefinedReadContractConfig) => {
  return useContractRead({
    contractFqn:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    functionName: 'placeholderURI',
    ...config,
  });
};
