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
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'holder',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'allowance(address,address)',
    args: [config.holder, config.spender] as ArgsType,
    enabled: Boolean(config.enabled && config.holder && config.spender),
    ...config,
  });
};
