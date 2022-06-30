import {
  PredefinedReadContractConfig,
  useContractRead,
  ZERO_ADDRESS,
} from '@0xflair/react-common';
import { BytesLike } from '@ethersproject/bytes';
import { BigNumberish } from 'ethers';

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
    enabled: ticketTokenIds && ticketTokenIds.length > 0 && enabled,
    ...restOfConfig,
  });
};
