export enum CryptoUnits {
  WEI = "wei",
  KWEI = "kwei",
  MWEI = "mwei",
  GWEI = "gwei",
  SZABO = "szabo",
  FINNEY = "finney",
  ETHER = "ether",
}

export enum PriceBaseCurrency {
  USD = "usd",
}

export type CryptoPriceDictionary = Record<PriceBaseCurrency, number>;
