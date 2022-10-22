import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

type Config = PredefinedReadContractConfig;

type ArgsType = [];

export const useERC20DecimalsLocked = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractInterface: ['function decimalsLocked() view returns (bool)'],
    functionName: 'decimalsLocked()',
    ...config,
  });
};
