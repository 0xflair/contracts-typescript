import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataUriSuffixLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: ['function uriSuffixLocked() view returns (bool)'],
    functionName: 'uriSuffixLocked()',
    ...config,
  });
};
