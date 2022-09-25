import { useCryptoPricesContext } from '../providers';
import { BaseCurrency, CryptoSymbol } from '../types';

type Config = {
  symbol?: CryptoSymbol;
  baseCurrency?: BaseCurrency;
};

export const useCryptoPrice = ({
  symbol = 'ETH',
  baseCurrency = 'USD',
}: Config = {}) => {
  const {
    state: { data: priceDictionariesBySymbol, error, loading },
  } = useCryptoPricesContext();

  const normalizedSymbol =
    priceDictionariesBySymbol &&
    symbol &&
    (Object.keys(priceDictionariesBySymbol).find((s) =>
      symbol.endsWith(s),
    ) as CryptoSymbol);

  const price =
    normalizedSymbol && priceDictionariesBySymbol[normalizedSymbol]
      ? priceDictionariesBySymbol[normalizedSymbol][baseCurrency.toLowerCase()]
      : undefined;

  if (
    !price &&
    normalizedSymbol &&
    baseCurrency &&
    Object.keys(priceDictionariesBySymbol).length > 0
  ) {
    console.info(
      `Could not resolve price of symbol (${symbol}) in base currency (${baseCurrency}), make sure both are defined on <CoinGeckoProvider />`,
    );
  }

  return {
    data: price,
    error,
    loading,
  } as const;
};
