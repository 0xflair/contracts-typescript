import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

export const useOzOwner = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/access/Ownable',
    functionName: 'owner',
    ...config,
  });
};
