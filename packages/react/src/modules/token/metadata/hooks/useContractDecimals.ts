import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractDecimals = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    abi: [
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'decimals()',
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 0,
    ...config,
  });
};
