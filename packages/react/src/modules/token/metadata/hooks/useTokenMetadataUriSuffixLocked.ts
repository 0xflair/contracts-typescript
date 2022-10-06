import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';

export const useTokenMetadataUriSuffixLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: ['function uriSuffixLocked() view returns (bool)'],
    functionName: 'uriSuffixLocked()',
    ...config,
  });
};
