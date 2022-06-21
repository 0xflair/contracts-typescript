import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type Config = PredefinedReadContractConfig<[BigNumberish]> & {
  calculateUntil?: BigNumberish;
};

export const useStreamClaimableAmountUntil = ({
  enabled,
  calculateUntil,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
    functionName: 'calculateClaimableAmountUntil',
    enabled: calculateUntil !== undefined && enabled,
    args: calculateUntil ? [calculateUntil] : [0],
    ...restOfConfig,
  });
};
