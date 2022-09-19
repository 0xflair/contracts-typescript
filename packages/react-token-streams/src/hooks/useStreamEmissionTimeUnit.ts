import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@flair-sdk/react-common';
import { BigNumberish } from 'ethers';

type ResultType = BigNumberish[];
type ArgsType = {};

export const useStreamEmissionTimeUnit = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'emission_time_unit',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
