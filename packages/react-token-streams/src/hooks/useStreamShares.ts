import { BigNumberish } from 'ethers';

import {
  ContractReadByFeatureConfig,
  useFeatureReadByTag,
} from '@0xflair/react-common';

type ResultType = BigNumberish[];
type ArgsType = { ticketTokenIds?: BigNumberish[] };

export const useStreamShares = (
  config: ContractReadByFeatureConfig<ArgsType>,
) => {
  return useFeatureReadByTag<ResultType, ArgsType>({
    tag: 'get_shares_by_tokens',
    enabled: Boolean(
      config.args.ticketTokenIds &&
        config.args.ticketTokenIds.length > 0 &&
        config.contractAddress,
    ),
    ...config,
  });
};
