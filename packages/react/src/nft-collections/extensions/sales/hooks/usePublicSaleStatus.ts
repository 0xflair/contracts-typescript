import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const usePublicSaleStatus = (config: PredefinedReadContractConfig) => {
  return useContractRead<boolean>({
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'publicSaleStatus',
    cacheOnBlock: false,
    cacheTime: 0,
    staleTime: 0,
    ...config,
  });
};
