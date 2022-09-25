export type NftToken = {
  tokenId: string;
  contractAddress: string;
  ownerAddress: string;
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
