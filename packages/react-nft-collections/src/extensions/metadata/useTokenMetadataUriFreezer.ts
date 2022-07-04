import {
  FeatureWriteByTagConfig,
  useFeatureWriteByTag,
} from '@0xflair/react-common';

type ArgsType = {};

export const useTokenMetadataUriFreezer = (
  config: FeatureWriteByTagConfig<ArgsType>
) => {
  return useFeatureWriteByTag<ArgsType>({
    tag: 'freeze_token_metadata_uri',
    ...config,
  });
};
