import * as React from 'react';

import { useCryptoPricesContext } from '../providers';
import { CryptoSymbol, PriceBaseCurrency } from '../types';

type Config = {
  symbol?: CryptoSymbol;
  baseCurrency?: PriceBaseCurrency;
};

export const useCryptoPrice = ({
  symbol,
  baseCurrency = PriceBaseCurrency.USD,
}: Config = {}) => {
  const {
    state: { data: priceDictionariesBySymbol, error, loading },
  } = useCryptoPricesContext();

  const normalizedSymbol =
    priceDictionariesBySymbol &&
    symbol &&
    (Object.keys(priceDictionariesBySymbol).find((s) =>
      symbol.endsWith(s)
    ) as CryptoSymbol);

  return [
    {
      data:
        normalizedSymbol && priceDictionariesBySymbol[normalizedSymbol]
          ? priceDictionariesBySymbol[normalizedSymbol][baseCurrency]
          : undefined,
      error,
      loading,
    },
  ] as const;
};
