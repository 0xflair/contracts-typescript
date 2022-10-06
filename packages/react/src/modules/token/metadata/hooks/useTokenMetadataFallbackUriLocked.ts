import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';

export const useTokenMetadataFallbackUriLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: ['function fallbackURILocked() view returns (bool)'],
    functionName: 'fallbackURILocked()',
    ...config,
  });
};
