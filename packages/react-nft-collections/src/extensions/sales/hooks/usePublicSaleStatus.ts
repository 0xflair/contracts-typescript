import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';

export const usePublicSaleStatus = (config: PredefinedReadContractConfig) => {
  return useContractRead<boolean>({
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'publicSaleStatus',
    ...config,
  });
};
