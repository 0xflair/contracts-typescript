import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type Config = PredefinedReadContractConfig<[BigNumberish[]]> & {
  ticketTokenIds?: BigNumberish[];
};

export const useStreamTotalReleasedBulk = ({
  enabled,
  ticketTokenIds,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
    functionName: 'getTotalReleasedBulk',
    enabled: ticketTokenIds && ticketTokenIds.length > 0 && enabled,
    args: ticketTokenIds ? [ticketTokenIds] : undefined,
    ...restOfConfig,
  });
};
