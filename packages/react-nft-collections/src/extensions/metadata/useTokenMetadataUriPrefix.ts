import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';

export const useTokenMetadataUriPrefix = (config: FeatureReadByTagConfig) => {
  return useFeatureReadByTag<boolean>({
    tag: 'token_metadata_uri_prefix',
    ...config,
  });
};
