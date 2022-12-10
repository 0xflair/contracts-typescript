import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractName = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    abi: [
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'name()',
    cacheTime: 1000 * 60 * 60 * 1,
    staleTime: 1000 * 60 * 60 * 1,
    ...config,
  });
};
