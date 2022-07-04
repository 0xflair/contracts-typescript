import {
  FeatureWriteByTagConfig,
  useFeatureWriteByTag,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

type ArgsType = {
  uriPrefix: BytesLike;
};

export const useTokenMetadataUriPrefixUpdater = (
  config: FeatureWriteByTagConfig<ArgsType>
) => {
  return useFeatureWriteByTag<ArgsType>({
    tag: 'set_token_metadata_uri_prefix',
    ...config,
  });
};
