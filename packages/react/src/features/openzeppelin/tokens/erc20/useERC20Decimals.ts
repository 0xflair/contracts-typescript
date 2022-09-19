import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../../common';

export const useERC20Decimals = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'decimals',
    ...config,
  });
};
