import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useTokenMetadataUriSuffix = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractInterface: ['function uriSuffix() view returns (string)'],
    functionName: 'uriSuffix()',
    ...config,
  });
};
