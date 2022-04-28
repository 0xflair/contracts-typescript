import * as React from 'react';

import { BaseCurrency, CryptoSymbol } from '../types';
import { useCryptoInfo } from './useCryptoInfo';
import { useCryptoPrice } from './useCryptoPrice';

type Config = {
  symbol?: CryptoSymbol;
  baseCurrency?: BaseCurrency;
};

export const useCryptoCurrency = ({
  symbol = 'ETH',
  baseCurrency = 'USD',
}: Config = {}) => {
  const info = useCryptoInfo(symbol);
  const {
    data: price,
    error,
    loading,
  } = useCryptoPrice({
    symbol,
    baseCurrency,
  });

  return {
    data: {
      info,
      price,
    },
    error,
    loading,
  } as const;
};
