import * as React from "react";

import { useCryptoPricesContext } from "../providers";
import { PriceUpstream } from "../types";

type Config = {
  symbol?: string;
  priceUpstream?: PriceUpstream;
};

export const useCryptoPrice = ({
  symbol,
  priceUpstream = PriceUpstream.COIN_GECKO,
}: Config = {}) => {
  const { state } = useCryptoPricesContext();

  return [
    {
      data:
        symbol &&
        state.data &&
        state.data[priceUpstream] &&
        state.data[priceUpstream][symbol]
          ? state.data[priceUpstream][symbol].usd
          : undefined,
      error: state.error,
      loading: state.loading,
    },
  ] as const;
};
