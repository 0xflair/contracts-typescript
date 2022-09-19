import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@flair-sdk/react-common';
import { BytesLike } from 'ethers';

export const useTokenMetadataUriSuffix = (config: FeatureReadByTagConfig) => {
  return useFeatureReadByTag<BytesLike>({
    tag: 'token_metadata_uri_suffix',
    ...config,
  });
};
