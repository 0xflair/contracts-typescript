import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const usePublicSaleMaxMintPerTx = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'publicSaleMaxMintPerTx',
    ...config,
  });
};
