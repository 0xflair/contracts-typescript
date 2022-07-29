import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

export const usePreSaleAllowlistMerkleRoot = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BytesLike>({
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSaleAllowlistMerkleRoot',
    ...config,
  });
};
