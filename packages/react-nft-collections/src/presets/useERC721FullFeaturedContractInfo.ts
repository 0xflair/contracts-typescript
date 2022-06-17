import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

export type ERC721FullFeaturedContractInfo = [
  maxSupply?: BigNumberish,
  totalSupply?: BigNumberish,
  callerBalance?: BigNumberish,
  preSalePrice?: BigNumberish,
  preSaleMaxMintPerWallet?: BigNumberish,
  preSaleAllowlistClaimed?: BigNumberish,
  preSaleStatus?: boolean | 'true' | 'false',
  publicSalePrice?: BigNumberish,
  publicSaleMaxMintPerTx?: BigNumberish,
  publicSaleStatus?: boolean | 'true' | 'false'
];

export const useERC721FullFeaturedContractInfo = ({
  contractVersion,
  contractAddress,
  ...restOfConfig
}: PredefinedReadContractConfig) => {
  return useContractRead<ERC721FullFeaturedContractInfo>({
    contractVersion,
    contractFqn: 'collections/ERC721/presets/ERC721FullFeaturedCollection',
    functionName: 'getInfo',
    contractAddress,
    ...restOfConfig,
  });
};
