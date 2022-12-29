import {
  BaseCurrency,
  CryptoCurrency,
  CryptoPriceDictionary,
  CryptoSymbol,
  DOLLAR_STABLECOIN_SYMBOLS,
  KNOWN_BASE_CURRENCIES,
  KNOWN_CRYPTO_CURRENCIES,
} from '@flair-sdk/common';
import axios from 'axios';
import React from 'react';

type PricesDictionariesBySymbol = Record<CryptoSymbol, CryptoPriceDictionary>;

type State = {
  data?: PricesDictionariesBySymbol;
  loading?: boolean;
  error?: Error;
};

type ContextValue = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  fetchPrices: () => Promise<void>;
};

export const Context = React.createContext<ContextValue | null>(null);

export type CoinGeckoProviderProps = {
  config?: {
    currencies: CryptoCurrency[];
    baseCurrencies: BaseCurrency[];
  };
};

function convertCoinGeckoSymbol(coinGeckoSymbol: string): CryptoSymbol {
  const currency = KNOWN_CRYPTO_CURRENCIES.find(
    ({ coinGeckoId }) => coinGeckoId === coinGeckoSymbol,
  );

  if (currency) {
    return currency.symbol.toUpperCase();
  }

  return coinGeckoSymbol.toUpperCase();
}

export const CoinGeckoProvider = ({
  config,
  children,
}: React.PropsWithChildren<CoinGeckoProviderProps>) => {
  const {
    currencies = KNOWN_CRYPTO_CURRENCIES,
    baseCurrencies = KNOWN_BASE_CURRENCIES,
  } = config || {};
  const [state, setState] = React.useState<State>({});

  const fetchPrices = React.useCallback(async () => {
    setState({ loading: true });

    try {
      const { data: coinGeckoResult } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${currencies
          .map((c) => c.coinGeckoId?.toLowerCase())
          .join(',')}&vs_currencies=${baseCurrencies
          .map((c) => c.toLowerCase())
          .join(',')}`,
      );

      const data: PricesDictionariesBySymbol = {} as PricesDictionariesBySymbol;

      for (const coinGeckoSymbol in coinGeckoResult) {
        const pairs = Object.entries(coinGeckoResult[coinGeckoSymbol]);
        const convertedPairs = pairs.map(([key, value]) => [
          key.toUpperCase(),
          value,
        ]);
        data[convertCoinGeckoSymbol(coinGeckoSymbol)] =
          Object.fromEntries(convertedPairs);
      }

      // Override for USD symbols
      for (const sym of DOLLAR_STABLECOIN_SYMBOLS) {
        data[sym.toUpperCase()] = {
          USD: 1,
        };
      }

      data['GOR'] = data['ETH'];

      setState({ data, loading: false });
    } catch (e) {
      setState({ error: e as Error, loading: false });
    }
  }, [baseCurrencies, currencies]);

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    fetchPrices().catch((error) => {
      console.error('Could not fetch prices: ', error);
    });
  }, []);

  const value: ContextValue = {
    state: {
      data: state.data,
      loading: state.loading,
      error: state.error,
    },
    setState,
    fetchPrices,
  };

  return React.createElement(Context.Provider, { value }, children);
};

export const useCryptoPricesContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error('Must be used within CoinGeckoProvider');
  return context;
};
