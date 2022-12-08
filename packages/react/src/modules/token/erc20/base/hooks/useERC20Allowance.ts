import { BigNumberish, BytesLike, ethers } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

type ArgsType = [holder: BytesLike, spender: BytesLike];

type Config = PredefinedReadContractConfig<ArgsType> & {
  holder?: BytesLike;
  spender?: BytesLike;
};

export const useERC20Allowance = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractInterface: [
      'function allowance(address holder, address spender) view returns (uint256)',
    ],
    functionName: 'allowance(address,address)',
    args: [config.holder, config.spender] as ArgsType,
    enabled: Boolean(config.enabled && config.holder && config.spender),
    ...config,
  });
};
