import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const useERC721MaxSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractInterface: ['function maxSupply() view returns (uint256)'],
    functionName: 'maxSupply()',
    ...config,
  });
};
