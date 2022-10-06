import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';

export const useTokenMetadataBaseUriLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: ['function baseURILocked() view returns (bool)'],
    functionName: 'baseURILocked()',
    ...config,
  });
};
