import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useWithdrawRecipient = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    abi: [
      {
        inputs: [],
        name: 'withdrawRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'withdrawRecipient()',
    ...config,
  });
};
