import {
  BaseCurrency,
  CryptoSymbol,
  DOLLAR_STABLECOIN_SYMBOLS,
} from '@flair-sdk/common';

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
    isLoading,
  } = useCryptoPrice({
    symbol,
    baseCurrency,
  });

  return {
    data: {
      info,
      price:
        DOLLAR_STABLECOIN_SYMBOLS.map((s) => s.toUpperCase()).includes(
          symbol.toString().toUpperCase(),
        ) && baseCurrency.toUpperCase() === 'USD'
          ? 1
          : price,
    },
    error,
    isLoading,
  } as const;
};
