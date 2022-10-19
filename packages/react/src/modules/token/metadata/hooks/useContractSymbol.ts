import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractSymbol = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function symbol() view returns (string)'],
    functionName: 'symbol()',
    ...config,
  });
};
