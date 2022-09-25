import { BytesLike } from 'ethers';

import { FeatureReadByTagConfig, useFeatureReadByTag } from '../../../common';

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
