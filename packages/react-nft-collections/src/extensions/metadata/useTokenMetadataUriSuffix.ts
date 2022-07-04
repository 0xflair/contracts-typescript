import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';

export const useTokenMetadataUriSuffix = (config: FeatureReadByTagConfig) => {
  return useFeatureReadByTag<boolean>({
    tag: 'token_metadata_uri_suffix',
    ...config,
  });
};
