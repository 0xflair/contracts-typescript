import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';

export const usePreSaleStatus = (config: PredefinedReadContractConfig) => {
  return useContractRead<boolean>({
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSaleStatus',
    cacheOnBlock: false,
    cacheTime: 0,
    staleTime: 0,
    ...config,
  });
};
