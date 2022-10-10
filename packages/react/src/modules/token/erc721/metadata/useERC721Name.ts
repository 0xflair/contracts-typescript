import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useERC721Name = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractInterface: ['function name() view returns (string)'],
    functionName: 'name()',
    ...config,
  });
};
