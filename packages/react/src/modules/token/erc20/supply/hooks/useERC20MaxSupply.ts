import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const useERC20MaxSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    abi: [
      {
        inputs: [],
        name: 'maxSupply',
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
    functionName: 'maxSupply()',
    ...config,
  });
};
