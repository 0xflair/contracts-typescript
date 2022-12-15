import * as ethers from 'ethers';
import { BigNumberish } from 'ethers';
import { useMemo } from 'react';

import { useCryptoCurrency } from '../../hooks';
import { BaseCurrency, CryptoSymbol, CryptoUnits } from '../../types';

type Props = {
  value?: string | BigNumberish;
  fractionDigits?: number;
  unit?: CryptoUnits | BigNumberish;
  symbol?: CryptoSymbol;
  baseCurrency?: BaseCurrency;
  showCurrencySymbol?: boolean;
};

export const CryptoPrice = (props: Props) => {
  const {
    value = '1',
    fractionDigits = 2,
    unit = CryptoUnits.ETHER,
    symbol = 'ETH',
    baseCurrency = 'USD',
    showCurrencySymbol = true,
  } = props;

  const { data } = useCryptoCurrency({
    symbol,
    baseCurrency,
  });

  const etherValue = useMemo(() => {
    try {
      const valueBn = ethers.utils.parseUnits(value?.toString() || '0', unit);
      return ethers.utils.formatUnits(valueBn, unit);
    } catch (e) {
      console.error(
        `Error parsing value: `,
        { value, fractionDigits, unit, symbol },
        e,
      );
    }
  }, [fractionDigits, symbol, unit, value]);

  return etherValue !== undefined &&
    data.price !== undefined &&
    fractionDigits !== undefined ? (
    showCurrencySymbol ? (
      baseCurrency === 'USD' ? (
        <>
          ${(Number(etherValue) * Number(data.price)).toFixed(fractionDigits)}
        </>
      ) : (
        <>
          {(Number(etherValue) * Number(data.price)).toFixed(fractionDigits)}{' '}
          {baseCurrency}
        </>
      )
    ) : (
      <>{(Number(etherValue) * Number(data.price)).toFixed(fractionDigits)}</>
    )
  ) : null;
};
