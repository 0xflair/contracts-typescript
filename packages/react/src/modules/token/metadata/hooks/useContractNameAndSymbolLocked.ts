import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractNameAndSymbolLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    abi: [
      {
        inputs: [],
        name: 'nameAndSymbolLocked',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'nameAndSymbolLocked()',
    ...config,
  });
};
