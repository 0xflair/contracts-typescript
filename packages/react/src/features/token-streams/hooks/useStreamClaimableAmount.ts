import { BytesLike } from '@ethersproject/bytes';
import { ZERO_ADDRESS } from '@flair-sdk/common';
import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../common';

type Config = PredefinedReadContractConfig<[BigNumberish[], BytesLike]> & {
  ticketTokenIds?: BigNumberish[];
  claimToken?: BytesLike;
};

export const useStreamClaimableAmount = ({
  enabled,
  ticketTokenIds,
  claimToken = ZERO_ADDRESS,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/base/ERC721MultiTokenStream',
    functionName: 'streamClaimableAmount(uint256[],address)',
    args: ticketTokenIds ? [ticketTokenIds, claimToken] : [[], claimToken],
    enabled: Boolean(ticketTokenIds && ticketTokenIds.length > 0 && enabled),
    ...restOfConfig,
  });
};
