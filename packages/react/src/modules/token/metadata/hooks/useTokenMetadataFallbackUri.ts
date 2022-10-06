import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';
import { BytesLike } from 'ethers';

export const useTokenMetadataFallbackUri = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function fallbackURI() view returns (string)'],
    functionName: 'fallbackURI()',
    ...config,
  });
};
