import axios from 'axios';
import React from 'react';

import { ALL_CURRENCIES } from '../constants/currencies';
import { CryptoCurrency, CryptoPriceDictionary, CryptoSymbol } from '../types';

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

export type CryptoPricesProviderProps = {
  config?: {
    currencies: CryptoCurrency[];
  };
};

function convertCoinGeckoSymbol(coinGeckoSymbol: string) {
  switch (coinGeckoSymbol) {
    case 'ethereum':
      return CryptoSymbol.ETH;
    case 'matic-network':
      return CryptoSymbol.MATIC;
  }

  throw new Error(`Unsupported CoinGecko symbol: ${coinGeckoSymbol}`);
}

export const CryptoPricesProvider = ({
  config,
  children,
}: React.PropsWithChildren<CryptoPricesProviderProps>) => {
  const { currencies = ALL_CURRENCIES } = config || {};
  const [state, setState] = React.useState<State>({});

  const fetchPrices = React.useCallback(async () => {
    setState({ loading: true });

    try {
      const { data: coinGeckoResult } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${currencies
          .map((c) => c.coinGeckoId)
          .join(',')}&vs_currencies=usd`
      );

      const data: PricesDictionariesBySymbol = {} as PricesDictionariesBySymbol;

      for (const coinGeckoSymbol in coinGeckoResult) {
        data[convertCoinGeckoSymbol(coinGeckoSymbol)] =
          coinGeckoResult[coinGeckoSymbol];
      }

      setState({ data, loading: false });
    } catch (e) {
      setState({ error: e as Error, loading: false });
    }
  }, [currencies]);

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
  if (!context) throw Error('Must be used within CryptoPricesProvider');
  return context;
};
