import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

export const useStreamVestingRate = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
    functionName: 'vestingRate',
    ...config,
  });
};
