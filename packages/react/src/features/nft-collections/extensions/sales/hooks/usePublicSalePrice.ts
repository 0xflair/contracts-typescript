import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const usePublicSalePrice = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'publicSalePrice',
    ...config,
  });
};
