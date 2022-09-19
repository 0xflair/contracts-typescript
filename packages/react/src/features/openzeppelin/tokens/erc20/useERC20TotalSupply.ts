import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../../common';

export const useERC20TotalSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'totalSupply',
    ...config,
  });
};
