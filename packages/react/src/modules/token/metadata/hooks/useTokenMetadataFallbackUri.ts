import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataFallbackUri = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function fallbackURI() view returns (string)'],
    functionName: 'fallbackURI()',
    ...config,
  });
};
