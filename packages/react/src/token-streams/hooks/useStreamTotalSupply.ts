import { BytesLike } from '@ethersproject/bytes';
import { ZERO_ADDRESS } from '@flair-sdk/common';
import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../common';

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
