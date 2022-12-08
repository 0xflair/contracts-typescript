import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractSymbol = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function symbol() view returns (string)'],
    functionName: 'symbol()',
    cacheTime: 1000 * 60 * 60 * 3,
    staleTime: 1000 * 60 * 60 * 3,
    ...config,
  });
};
