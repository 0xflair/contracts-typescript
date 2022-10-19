import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useContractNameAndSymbolLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: ['function nameAndSymbolLocked() view returns (bool)'],
    functionName: 'nameAndSymbolLocked()',
    ...config,
  });
};
