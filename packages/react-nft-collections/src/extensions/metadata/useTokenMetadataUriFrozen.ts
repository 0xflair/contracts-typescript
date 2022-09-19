import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@flair-sdk/react-common';

export const useTokenMetadataUriFrozen = (config: FeatureReadByTagConfig) => {
  return useFeatureReadByTag<boolean>({
    tag: 'token_metadata_uri_frozen',
    ...config,
  });
};
