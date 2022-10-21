import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

type Config = PredefinedReadContractConfig;

type ArgsType = [];

export const useERC20Decimals = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractInterface: ['function decimals() view returns (uint256)'],
    functionName: 'decimals()',
    ...config,
  });
};
