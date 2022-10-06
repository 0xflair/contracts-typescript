import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';

export const useTokenMetadataBaseUriLocked = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractReference:
      'flair-sdk:token/ERC1155/facets/metadata/IERC1155MetadataExtra',
    functionName: 'baseURILocked',
    ...config,
  });
};
