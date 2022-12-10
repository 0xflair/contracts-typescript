import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const useERC20MaxSupplyFrozen = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    abi: [
      {
        inputs: [],
        name: 'maxSupplyFrozen',
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
    functionName: 'maxSupplyFrozen()',
    ...config,
  });
};
