import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type ResultType = BigNumberish;
type ArgsType = {
  ticketTokenIds?: BigNumberish[];
};

export const useStreamRateByToken = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'rate_by_multiple_tokens',
    enabled: Boolean(config.args?.ticketTokenIds && config.contractAddress),
    ...config,
  });
};
