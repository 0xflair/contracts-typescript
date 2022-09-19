import { BytesLike } from '@ethersproject/bytes';
import { ZERO_ADDRESS } from '@flair-sdk/common';
import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../common';

type ArgsType = [BigNumberish[], BytesLike] | [BytesLike];

type Config = PredefinedReadContractConfig<ArgsType> & {
  ticketTokenIds?: BigNumberish[];
  claimToken?: BytesLike;
};

export const useStreamTotalClaimed = ({
  enabled,
  ticketTokenIds,
  claimToken = ZERO_ADDRESS,
  ...restOfConfig
}: Config) => {
  const functionName = ticketTokenIds
    ? 'streamTotalClaimed(uint256[],address)'
    : 'streamTotalClaimed(address)';

  const args: ArgsType = ticketTokenIds
    ? [ticketTokenIds, claimToken]
    : [claimToken];

  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/base/ERC721MultiTokenStream',
    functionName,
    args,
    enabled: ticketTokenIds && ticketTokenIds.length > 0 && enabled,
    ...restOfConfig,
  });
};
