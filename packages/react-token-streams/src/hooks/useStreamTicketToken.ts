import {
  FeatureReadByTagConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

type ResultType = BytesLike;
type ArgsType = {};

export const useStreamTicketToken = (
  config: FeatureReadByTagConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'ticket_token',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
