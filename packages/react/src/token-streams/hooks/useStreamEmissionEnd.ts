import { BigNumberish } from 'ethers';

import { FeatureReadByTagConfig, useFeatureReadByTag } from '../../common';

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
