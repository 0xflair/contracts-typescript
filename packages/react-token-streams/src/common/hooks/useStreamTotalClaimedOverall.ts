import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

export const useStreamTotalClaimedOverall = (
  config: PredefinedReadContractConfig
) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'streams/ERC721/core/ERC721SingleTokenDistributor',
    functionName: 'streamTotalClaimed',
    ...config,
  });
};
