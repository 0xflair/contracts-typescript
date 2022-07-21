import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type ResultType = BigNumberish;
type ArgsType = {
  calculateUntil?: BigNumberish;
};

export const useStreamEmissionAmountUntil = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'emission_amount_until',
    enabled: Boolean(config.args?.calculateUntil && config.contractAddress),
    ...config,
  });
};
