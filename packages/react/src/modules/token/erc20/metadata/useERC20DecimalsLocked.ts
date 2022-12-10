import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

type Config = PredefinedReadContractConfig;

type ArgsType = [];

export const useERC20DecimalsLocked = (config: Config) => {
  return useContractRead<boolean, ArgsType>({
    abi: [
      {
        inputs: [],
        name: 'decimalsLocked',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'decimalsLocked()',
    ...config,
  });
};
