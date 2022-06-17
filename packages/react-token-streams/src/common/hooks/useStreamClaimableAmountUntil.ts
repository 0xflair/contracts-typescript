import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type Config = PredefinedReadContractConfig<[BigNumberish]> & {
  calculateUntil?: BigNumberish;
};

export const useStreamClaimableAmountUntil = ({
  calculateUntil,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
    functionName: 'calculateClaimableAmountUntil',
    args: calculateUntil ? [calculateUntil] : undefined,
    ...restOfConfig,
  });
};
