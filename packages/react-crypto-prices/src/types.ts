export enum CryptoUnits {
  WEI = "wei",
  KWEI = "kwei",
  MWEI = "mwei",
  GWEI = "gwei",
  SZABO = "szabo",
  FINNEY = "finney",
  ETHER = "ether",
}

export type CryptoSymbol = string;

export enum PriceBaseCurrency {
  USD = "usd",
}

export enum PriceUpstream {
  COIN_GECKO = "coinGecko",
}

export type CryptoPriceDictionary = Record<PriceBaseCurrency, number>;
