import { BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const usePreSaleAllowlistMerkleRoot = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSaleAllowlistMerkleRoot',
    ...config,
  });
};
