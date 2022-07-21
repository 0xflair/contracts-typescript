import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type ResultType = BigNumberish;
type ArgsType = {};

export const useStreamEmissionRate = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'emission_rate',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
