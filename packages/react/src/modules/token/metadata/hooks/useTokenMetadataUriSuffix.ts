import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';
import { BytesLike } from 'ethers';

export const useTokenMetadataUriSuffix = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractReference:
      'flair-sdk:token/ERC1155/facets/metadata/IERC1155MetadataExtra',
    functionName: 'uriSuffix',
    ...config,
  });
};
