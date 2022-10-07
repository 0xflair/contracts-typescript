import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataFallbackUriLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: ['function fallbackURILocked() view returns (bool)'],
    functionName: 'fallbackURILocked()',
    ...config,
  });
};
