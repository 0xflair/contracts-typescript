export type CryptoSymbol = 'ETH' | 'MATIC' | string;

export type CryptoCurrency = {
  symbol: CryptoSymbol;
  name: string;
  icon?: React.ReactNode;
  coinGeckoId?: string;
  coinMarketCapSymbol?: string;
};

export enum CryptoUnits {
  WEI = 'wei',
  KWEI = 'kwei',
  MWEI = 'mwei',
  GWEI = 'gwei',
  SZABO = 'szabo',
  FINNEY = 'finney',
  ETHER = 'ether',
}

export type BaseCurrency = 'USD' | string;

export type CryptoPriceDictionary = Record<BaseCurrency, number>;
