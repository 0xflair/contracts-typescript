import { BigNumberish } from 'ethers';

import { FeatureReadByTagConfig, useFeatureReadByTag } from '../../common';

type ResultType = BigNumberish[];
type ArgsType = {};

export const useStreamEmissionStart = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'emission_start',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
