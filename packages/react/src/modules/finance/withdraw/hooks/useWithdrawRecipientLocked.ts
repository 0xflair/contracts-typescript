import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useWithdrawRecipientLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    abi: [
      {
        inputs: [],
        name: 'withdrawRecipientLocked',
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
    functionName: 'withdrawRecipientLocked()',
    ...config,
  });
};
