import { BigNumberish } from 'ethers';

import {
  ContractReadByFeatureConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';

type ResultType = BigNumberish;
type ArgsType = {
  calculateUntil?: BigNumberish;
};

export const useStreamReleasedAmountUntil = (
  config: ContractReadByFeatureConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'released_amount_until',
    enabled: Boolean(config.args?.calculateUntil && config.contractAddress),
    ...config,
  });
};
