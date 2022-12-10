import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataFallbackUri = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    abi: [
      {
        inputs: [],
        name: 'fallbackURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'fallbackURI()',
    ...config,
  });
};
