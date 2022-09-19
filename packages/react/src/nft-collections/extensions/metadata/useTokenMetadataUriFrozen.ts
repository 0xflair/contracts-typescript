import { FeatureReadByTagConfig, useFeatureReadByTag } from '../../../common';

export const useTokenMetadataUriFrozen = (config: FeatureReadByTagConfig) => {
  return useFeatureReadByTag<boolean>({
    tag: 'token_metadata_uri_frozen',
    ...config,
  });
};
