import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataFallbackUriLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    abi: [
      {
        inputs: [],
        name: 'fallbackURILocked',
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
    functionName: 'fallbackURILocked()',
    ...config,
  });
};
