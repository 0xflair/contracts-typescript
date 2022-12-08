import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractName = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function name() view returns (string)'],
    functionName: 'name()',
    cacheTime: 1000 * 60 * 60 * 1,
    staleTime: 1000 * 60 * 60 * 1,
    ...config,
  });
};
