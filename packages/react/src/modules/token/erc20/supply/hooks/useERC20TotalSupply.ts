import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const useERC20TotalSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    abi: [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'totalSupply()',
    ...config,
  });
};
