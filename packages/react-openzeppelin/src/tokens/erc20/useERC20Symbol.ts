import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BytesLike } from 'ethers';

export const useERC20Symbol = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'symbol',
    ...config,
  });
};
