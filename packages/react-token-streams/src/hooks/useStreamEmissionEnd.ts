import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@flair-sdk/react-common';
import { BigNumberish } from 'ethers';

type ResultType = BigNumberish[];
type ArgsType = {};

export const useStreamEmissionEnd = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'emission_end',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
