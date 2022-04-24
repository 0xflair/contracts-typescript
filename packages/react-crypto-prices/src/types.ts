export enum CryptoSymbol {
  ETH = 'ETH',
  MATIC = 'MATIC',
}

export type CryptoCurrency = {
  symbol: CryptoSymbol;
  name: string;
  icon?: React.ReactNode;
  coinGeckoId?: string;
  wagmiId?: string;
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

export enum PriceBaseCurrency {
  USD = 'usd',
}

export type CryptoPriceDictionary = Record<PriceBaseCurrency, number>;
