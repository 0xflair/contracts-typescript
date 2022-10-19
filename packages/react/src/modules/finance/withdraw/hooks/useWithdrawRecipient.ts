import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useWithdrawRecipient = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function withdrawRecipient() view returns (address)'],
    functionName: 'withdrawRecipient()',
    ...config,
  });
};
