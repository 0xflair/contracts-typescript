import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type ResultType = BigNumberish;
type ArgsType = {
  ticketTokenIds?: BigNumberish[];
};

export const useStreamRewardAmountByToken = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'reward_amount_by_multi_tokens',
    enabled: Boolean(config.args?.ticketTokenIds && config.contractAddress),
    ...config,
  });
};
