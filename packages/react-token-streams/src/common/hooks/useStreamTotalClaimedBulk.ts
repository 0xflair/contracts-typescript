import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type Config = PredefinedReadContractConfig<[BigNumberish[]]> & {
  ticketTokenIds?: BigNumberish[];
};

export const useStreamTotalClaimedBulk = ({
  ticketTokenIds,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/core/ERC721BaseDistributor',
    functionName: 'getTotalClaimedBulk',
    args: ticketTokenIds ? [ticketTokenIds] : undefined,
    ...restOfConfig,
  });
};
