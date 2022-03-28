import * as React from "react";

export enum CryptoSymbol {
  ETH = "ETH",
  MATIC = "MATIC",
}

export type CryptoCurrency = {
  symbol: CryptoSymbol;
  name: string;
  icon?: React.ReactNode;
  coinGeckoId?: string;
  wagmiId?: string;
};

export const ALL_CURRENCIES: CryptoCurrency[] = [
  {
    symbol: CryptoSymbol.ETH,
    name: "Ethereum",
    icon: "Ξ",
    coinGeckoId: "ethereum",
  },
  {
    symbol: CryptoSymbol.MATIC,
    name: "Matic",
    icon: "$MATIC",
    coinGeckoId: "matic-network",
  },
];
