import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

export const useERC20Name = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'name',
    ...config,
  });
};
