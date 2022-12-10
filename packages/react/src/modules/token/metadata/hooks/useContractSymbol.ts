import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractSymbol = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    abi: [
      {
        inputs: [],
        name: 'symbol',
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
    functionName: 'symbol()',
    cacheTime: 1000 * 60 * 60 * 3,
    staleTime: 1000 * 60 * 60 * 3,
    ...config,
  });
};
