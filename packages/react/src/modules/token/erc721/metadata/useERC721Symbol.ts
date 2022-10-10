import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useERC721Symbol = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractInterface: ['function symbol() view returns (string)'],
    functionName: 'symbol()',
    ...config,
  });
};
