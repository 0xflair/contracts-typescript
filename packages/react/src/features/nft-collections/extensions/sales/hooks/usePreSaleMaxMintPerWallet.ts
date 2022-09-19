import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const usePreSaleMaxMintPerWallet = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSaleMaxMintPerWallet',
    ...config,
  });
};
