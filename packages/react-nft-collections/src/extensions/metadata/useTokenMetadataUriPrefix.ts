import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

export const useTokenMetadataUriPrefix = (config: FeatureReadByTagConfig) => {
  return useFeatureReadByTag<BytesLike>({
    tag: 'token_metadata_uri_prefix',
    ...config,
  });
};
