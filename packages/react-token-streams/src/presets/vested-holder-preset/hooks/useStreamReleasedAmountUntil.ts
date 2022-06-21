import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type Config = PredefinedReadContractConfig<[BigNumberish]> & {
  calculateUntil?: BigNumberish;
};

export const useStreamReleasedAmountUntil = ({
  enabled,
  calculateUntil,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
    functionName: 'calculateReleasedAmountUntil',
    args: calculateUntil ? [calculateUntil] : [0],
    enabled: calculateUntil !== undefined && enabled,
    ...restOfConfig,
  });
};
