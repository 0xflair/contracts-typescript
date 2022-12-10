import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataUriSuffix = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    abi: [
      {
        inputs: [],
        name: 'uriSuffix',
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
    functionName: 'uriSuffix()',
    ...config,
  });
};
