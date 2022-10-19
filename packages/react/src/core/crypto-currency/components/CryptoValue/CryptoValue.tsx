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
  targetUnit?: CryptoUnits;
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
    targetUnit = CryptoUnits.ETHER,
    symbol = 'ETH',
    showPrice = false,
    showSymbol = true,
    loadingContent = '...',
  } = props;

  const { data, error, isLoading: loading } = useCryptoCurrency({ symbol });

  const targetUnitValue = useMemo(() => {
    try {
      const valueBn = ethers.utils.parseUnits(
        BigNumber.from(value || '0')?.toString() || '0',
        unit,
      );
      return ethers.utils.formatUnits(valueBn, targetUnit);
    } catch (e) {
      debugger;
      console.error(`Error parsing value: `, value, e);
    }
  }, [targetUnit, unit, value]);

  const fractions = useMemo(() => {
    try {
      return Math.max(
        fractionDigits !== undefined
          ? fractionDigits
          : symbol?.toString().toLowerCase().endsWith('eth')
          ? targetUnit === CryptoUnits.ETHER
            ? 4
            : 0
          : 2,
        (targetUnitValue?.match(/^(0|\.)+/)?.[0]?.length || 3) - 1,
      );
    } catch (e) {
      debugger;
      console.error(
        `Error guessing fractions: `,
        fractionDigits,
        targetUnitValue,
        e,
      );
    }
  }, [fractionDigits, symbol, targetUnit, targetUnitValue]);

  if (error) {
    console.warn(`Could not fetch price for ${symbol}: `, error);
  }

  const valueToRenderFormatted = useMemo(() => {
    try {
      if (!targetUnitValue) return;

      const valueToRender = parseFloat(targetUnitValue)
        .toFixed(fractions)
        .toString();

      let [leading, trailing] = valueToRender.split('.');
      trailing = trailing?.replace(/0+$/, '');

      return `${leading}${trailing ? `.${trailing}` : ''}`;
    } catch (e) {
      debugger;
      console.error(`Error formatting value: `, targetUnitValue, fractions, e);
    }
  }, [targetUnitValue, fractions]);

  return loading ? (
    <>{loadingContent}</>
  ) : (
    <>
      {valueToRenderFormatted || '...'}{' '}
      {showSymbol
        ? targetUnit === CryptoUnits.ETHER
          ? data.info?.icon || symbol
          : targetUnit
        : null}
      {showPrice && data.price && Number(data.price) > 0 ? (
        <>
          {' '}
          (~
          <CryptoPrice
            value={value}
            fractionDigits={1}
            symbol={symbol}
            unit={unit}
          />
          )
        </>
      ) : null}
    </>
  );
};
