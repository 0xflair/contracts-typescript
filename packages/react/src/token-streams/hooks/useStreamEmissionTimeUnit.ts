import { BigNumberish } from 'ethers';

import { FeatureReadByTagConfig, useFeatureReadByTag } from '../../common';

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
