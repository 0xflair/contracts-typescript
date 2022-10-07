import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataBaseUri = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function baseURI() view returns (string)'],
    functionName: 'baseURI()',
    ...config,
  });
};
