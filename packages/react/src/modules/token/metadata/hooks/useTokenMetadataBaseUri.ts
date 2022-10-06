import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';
import { BytesLike } from 'ethers';

export const useTokenMetadataBaseUri = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function baseURI() view returns (string)'],
    functionName: 'baseURI()',
    ...config,
  });
};
