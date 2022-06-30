import { BigNumberish } from 'ethers';

import {
  ContractReadByFeatureConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';

type ResultType = BigNumberish[];
type ArgsType = {};

export const useStreamEmissionStart = (
  config: ContractReadByFeatureConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'emission_start',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
