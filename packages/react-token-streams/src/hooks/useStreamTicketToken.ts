import { BytesLike } from 'ethers';

import {
  ContractReadByFeatureConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';

type ResultType = BytesLike;
type ArgsType = {};

export const useStreamTicketToken = (
  config: ContractReadByFeatureConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'ticket_token',
    enabled: Boolean(config.contractAddress),
    ...config,
  });
};
