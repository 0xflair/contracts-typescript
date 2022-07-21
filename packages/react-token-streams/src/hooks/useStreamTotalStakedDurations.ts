import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type ResultType = BigNumberish[];
type ArgsType = {
  ticketTokenIds?: BigNumberish[];
};

export const useStreamTotalStakedDurations = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'total_staked_duration_multiple_tokens',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
