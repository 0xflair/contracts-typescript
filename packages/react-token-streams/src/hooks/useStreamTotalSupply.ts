import {
  PredefinedReadContractConfig,
  useContractRead,
  ZERO_ADDRESS,
} from '@0xflair/react-common';
import { BytesLike } from '@ethersproject/bytes';
import { BigNumberish } from 'ethers';

type ArgsType = [BytesLike];

type Config = PredefinedReadContractConfig<ArgsType> & {
  claimToken?: BytesLike;
};

export const useStreamTotalSupply = ({
  claimToken = ZERO_ADDRESS,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/base/ERC721MultiTokenStream',
    functionName: 'streamTotalSupply(address)',
    args: [claimToken],
    ...restOfConfig,
  });
};
