import { BigNumber, BigNumberish, ethers, utils } from 'ethers';

import { useCryptoPricesContext } from '../providers';
import { BaseCurrency, CryptoSymbol, CryptoUnits } from '../types';

type Config = {
  amount?: BigNumberish;
  amountUnit?: CryptoUnits;
  symbol?: CryptoSymbol;
  baseCurrency?: BaseCurrency;
};

export const useCryptoPrice = ({
  amount = 1,
  amountUnit = CryptoUnits.ETHER,
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

  const amountRaw = amount
    ? ethers.utils.parseUnits(amount.toString(), amountUnit)
    : undefined;
  const convertedAmountEther = amountRaw
    ? ethers.utils.formatEther(amountRaw)
    : undefined;

  const total =
    price && convertedAmountEther
      ? Number(convertedAmountEther.toString()) * price
      : undefined;

  return {
    data: total,
    error,
    isLoading,
  } as const;
};
