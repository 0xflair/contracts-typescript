import React from "react";
import axios from "axios";
import { CryptoPriceDictionary, CryptoSymbol, PriceUpstream } from "../types";

type PricesDictionariesBySymbol = Record<CryptoSymbol, CryptoPriceDictionary>;

type PricesDataByUpstream = Record<PriceUpstream, PricesDictionariesBySymbol>;

type State = {
  data?: PricesDataByUpstream;
  loading?: boolean;
  error?: Error;
};

type ContextValue = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  fetchPrices: () => Promise<void>;
};

export const Context = React.createContext<ContextValue | null>(null);

export type Props = {
  config?: {
    coinGecko?: {
      symbols: string[];
    };
  };
};

export const CryptoPricesProvider = ({
  config,
  children,
}: React.PropsWithChildren<Props>) => {
  const { coinGecko } = config || {
    coinGecko: {
      symbols: ["ethereum", "matic-network"],
    },
  };
  const [state, setState] = React.useState<State>({});

  const fetchPrices = React.useCallback(async () => {
    if (coinGecko) {
      setState({ loading: true });

      try {
        const { data: coinGeckoResult } =
          await axios.get<PricesDictionariesBySymbol>(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinGecko.symbols.join(
              ","
            )}&vs_currencies=usd`
          );

        setState({ data: { coinGecko: coinGeckoResult }, loading: false });
      } catch (e) {
        setState({ error: e as Error, loading: false });
      }
    }
  }, [coinGecko]);

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    fetchPrices().catch((error) => {
      console.error("Could not fetch prices: ", error);
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
  if (!context) throw Error("Must be used within CryptoPricesProvider");
  return context;
};
