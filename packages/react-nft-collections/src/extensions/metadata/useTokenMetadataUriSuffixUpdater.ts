import {
  FeatureWriteByTagConfig,
  useFeatureWriteByTag,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

type ArgsType = {
  uriSuffix: BytesLike;
};

export const useTokenMetadataUriSuffixUpdater = (
  config: FeatureWriteByTagConfig<ArgsType>
) => {
  return useFeatureWriteByTag<ArgsType>({
    tag: 'set_token_metadata_uri_suffix',
    ...config,
  });
};
