import { BytesLike } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../common';

export const useOzOwner = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/access/Ownable',
    functionName: 'owner',
    ...config,
  });
};
