import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataBaseUri = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    abi: [
      {
        inputs: [],
        name: 'baseURI',
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
    functionName: 'baseURI()',
    ...config,
  });
};
