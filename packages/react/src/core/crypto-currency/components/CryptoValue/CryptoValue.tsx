import * as ethers from 'ethers';
import { BigNumber, BigNumberish } from 'ethers';
import { ReactNode, useMemo } from 'react';

import { useCryptoCurrency } from '../../hooks';
import { CryptoSymbol, CryptoUnits } from '../../types';
import { CryptoPrice } from '../CryptoPrice/CryptoPrice';

type Props = {
  value?: BigNumberish;
  fractionDigits?: number;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
  showPrice?: boolean;
  showSymbol?: boolean;
  loadingContent?: ReactNode;
};

export const CryptoValue = (props: Props) => {
  const {
    value = '0',
    fractionDigits,
    unit = CryptoUnits.ETHER,
    symbol = 'ETH',
    showPrice = true,
    showSymbol = true,
    loadingContent = '...',
  } = props;

  const { data, error, loading } = useCryptoCurrency({ symbol });

  const etherValue = useMemo(() => {
    try {
      const valueBn = ethers.utils.parseUnits(
        BigNumber.from(value || '0')?.toString() || '0',
        unit,
      );
      return ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);
    } catch (e) {
      debugger;
      console.error(`Error parsing value: `, value, e);
    }
  }, [unit, value]);

  const fractions = useMemo(() => {
    try {
      return Math.max(
        fractionDigits !== undefined
          ? fractionDigits
          : symbol?.toString().toLowerCase().endsWith('eth')
          ? 4
          : 2,
        (etherValue?.match(/^(0|\.)+/)?.[0]?.length || 3) - 1,
      );
    } catch (e) {
      debugger;
      console.error(
        `Error guessing fractions: `,
        fractionDigits,
        etherValue,
        e,
      );
    }
  }, [etherValue, fractionDigits, symbol]);

  if (error) {
    console.warn(`Could not fetch price for ${symbol}: `, error);
  }

  const valueToRenderFormatted = useMemo(() => {
    try {
      if (!etherValue) return;

      const valueToRender = parseFloat(etherValue)
        .toFixed(fractions)
        .toString();

      let [leading, trailing] = valueToRender.split('.');
      trailing = trailing?.replace(/0+$/, '');

      return `${leading}${trailing ? `.${trailing}` : ''}`;
    } catch (e) {
      debugger;
      console.error(`Error formatting value: `, etherValue, fractions, e);
    }
  }, [etherValue, fractions]);

  return loading ? (
    <>{loadingContent}</>
  ) : (
    <>
      {valueToRenderFormatted || '...'}{' '}
      {showSymbol ? data.info?.icon || symbol : null}
      {showPrice && data.price && Number(data.price) > 0 ? (
        <>
          {' '}
          (~
          <CryptoPrice
            value={value}
            fractionDigits={0}
            symbol={symbol}
            unit={unit}
          />{' '}
          USD)
        </>
      ) : null}
    </>
  );
};
