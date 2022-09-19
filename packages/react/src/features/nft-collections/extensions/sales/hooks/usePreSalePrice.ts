import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const usePreSalePrice = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSalePrice',
    ...config,
  });
};
