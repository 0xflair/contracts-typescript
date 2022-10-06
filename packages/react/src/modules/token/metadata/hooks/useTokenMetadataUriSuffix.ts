import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';
import { BytesLike } from 'ethers';

export const useTokenMetadataUriSuffix = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function uriSuffix() view returns (string)'],
    functionName: 'uriSuffix',
    ...config,
  });
};
