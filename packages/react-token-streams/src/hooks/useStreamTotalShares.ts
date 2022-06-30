import {
  PredefinedReadContractConfig,
  useContractRead,
  ZERO_ADDRESS,
} from '@0xflair/react-common';
import { BytesLike } from '@ethersproject/bytes';
import { BigNumberish } from 'ethers';

type ArgsType = [];

type Config = PredefinedReadContractConfig<ArgsType>;

export const useStreamTotalShares = (config: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/extensions/ERC721ShareSplitExtension',
    functionName: 'totalShares()',
    ...config,
  });
};
