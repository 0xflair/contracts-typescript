import { BytesLike } from 'ethers';

import { FeatureReadByTagConfig, useFeatureReadByTag } from '../../../common';

export const useTokenMetadataUriSuffix = (config: FeatureReadByTagConfig) => {
  return useFeatureReadByTag<BytesLike>({
    tag: 'token_metadata_uri_suffix',
    ...config,
  });
};
