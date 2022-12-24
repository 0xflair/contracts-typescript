import { BaseCurrency, CryptoSymbol, CryptoUnits } from '@flair-sdk/common';
import { BigNumberish, ethers } from 'ethers';
import { useMemo } from 'react';

import { useCryptoCurrency } from '../../hooks';

type Props = {
  value?: string | BigNumberish;
  fractionDigits?: number;
  formatted?: boolean;
  decimals?: CryptoUnits | BigNumberish;
  symbol?: CryptoSymbol;
  baseCurrency?: BaseCurrency;
  showCurrencySymbol?: boolean;
};

export const CryptoPrice = (props: Props) => {
  const {
    value = '1',
    fractionDigits = 2,
    formatted = true,
    decimals = CryptoUnits.ETHER,
    symbol = 'ETH',
    baseCurrency = 'USD',
    showCurrencySymbol = true,
  } = props;

  const { data } = useCryptoCurrency({
    symbol,
    baseCurrency,
  });

  const valueBn = useMemo(
    () =>
      formatted
        ? ethers.utils.parseUnits(value?.toString() || '0', decimals)
        : ethers.BigNumber.from(value),
    [decimals, formatted, value],
  );

  const formattedValue = useMemo(() => {
    try {
      return ethers.utils.formatUnits(valueBn, decimals);
    } catch (e) {
      console.error(
        `Error parsing value: `,
        { value, fractionDigits, unit: decimals, symbol },
        e,
      );
    }
  }, [decimals, fractionDigits, symbol, value, valueBn]);

  return formattedValue !== undefined &&
    data.price !== undefined &&
    fractionDigits !== undefined ? (
    showCurrencySymbol ? (
      baseCurrency === 'USD' ? (
        <>
          $
          {(Number(formattedValue) * Number(data.price)).toFixed(
            fractionDigits,
          )}
        </>
      ) : (
        <>
          {(Number(formattedValue) * Number(data.price)).toFixed(
            fractionDigits,
          )}{' '}
          {baseCurrency}
        </>
      )
    ) : (
      <>
        {(Number(formattedValue) * Number(data.price)).toFixed(fractionDigits)}
      </>
    )
  ) : null;
};
