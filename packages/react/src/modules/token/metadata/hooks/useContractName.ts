import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractName = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function name() view returns (string)'],
    functionName: 'name()',
    ...config,
  });
};
