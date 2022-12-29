import { BaseCurrency, CryptoSymbol } from '@flair-sdk/common';
import { BigNumberish, ethers } from 'ethers';

import { useCryptoPricesContext } from '../providers';

type Config = {
  amount?: BigNumberish;
  decimals?: BigNumberish;
  symbol?: CryptoSymbol;
  baseCurrency?: BaseCurrency;
};

export const useCryptoPrice = ({
  amount = ethers.utils.parseEther('1'),
  decimals = 18,
  symbol = 'ETH',
  baseCurrency = 'USD',
}: Config = {}) => {
  const {
    state: { data: priceDictionariesBySymbol, error, loading: isLoading },
  } = useCryptoPricesContext();

  const normalizedSymbol =
    priceDictionariesBySymbol &&
    symbol &&
    (Object.keys(priceDictionariesBySymbol).find((s) =>
      symbol.toUpperCase().endsWith(s.toUpperCase()),
    ) as CryptoSymbol);

  const price =
    normalizedSymbol &&
    priceDictionariesBySymbol[normalizedSymbol.toUpperCase()]
      ? priceDictionariesBySymbol[normalizedSymbol.toUpperCase()][
          baseCurrency.toUpperCase()
        ]
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

  const formattedAmount = amount
    ? ethers.utils.formatUnits(amount.toString(), decimals)
    : undefined;

  const total =
    price && formattedAmount
      ? Number(formattedAmount.toString()) * price
      : undefined;

  return {
    data: total,
    error,
    isLoading,
  } as const;
};
