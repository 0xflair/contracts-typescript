import { NftTokenMetadata } from '../../../modules/token/metadata/types';

export type NftToken = {
  tokenId: string;
  contractAddress: string;
  ownerAddress: string;
  tokenUri?: string;
  metadata?: NftTokenMetadata;
};

export type TokenBalance = {
  chainId: number;
  tokenAddress: string;
  ownerAddress: string;
  name: string;
  symbol: string;
  decimals: string;
  balance: string;
  icon: string;
};
