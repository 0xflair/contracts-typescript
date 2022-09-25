import { BigNumberish } from 'ethers';

import { FeatureReadByTagConfig, useFeatureReadByTag } from '../../../common';

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
