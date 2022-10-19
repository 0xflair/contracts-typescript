import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useWithdrawRecipientLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: [
      'function withdrawRecipientLocked() view returns (bool)',
    ],
    functionName: 'withdrawRecipientLocked()',
    ...config,
  });
};
