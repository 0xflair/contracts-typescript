import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

export const useStreamTotalClaimed = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'streams/ERC721/core/ERC721BaseDistributor',
    functionName: 'streamTotalClaimed',
    ...config,
  });
};
