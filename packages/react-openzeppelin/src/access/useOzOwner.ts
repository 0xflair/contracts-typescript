import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BytesLike } from 'ethers';

export const useOzOwner = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/access/Ownable',
    functionName: 'owner',
    ...config,
  });
};
