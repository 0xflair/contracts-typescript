import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../common';

type ArgsType = [];

type Config = PredefinedReadContractConfig<ArgsType>;

export const useStreamTotalShares = (config: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/extensions/ERC721ShareSplitExtension',
    functionName: 'totalShares()',
    ...config,
  });
};
