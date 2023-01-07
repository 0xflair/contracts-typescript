import { CryptoSymbol, CryptoUnits } from '@flair-sdk/common';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { ReactNode, useMemo } from 'react';

import { useCryptoCurrency } from '../../hooks';
import { CryptoPrice } from '../CryptoPrice/CryptoPrice';

type Props = {
  value?: BigNumberish;
  fractionDigits?: number;
  formatted?: boolean;
  decimals?: BigNumberish;
  outputUnit?: CryptoUnits;
  symbol?: CryptoSymbol;
  showPrice?: boolean;
  showSymbol?: boolean;
  loadingContent?: ReactNode;
};

export const CryptoValue = (props: Props) => {
  const {
    value = '0',
    fractionDigits,
    formatted = true,
    decimals = CryptoUnits.ETHER,
    outputUnit,
    symbol = 'ETH',
    showPrice = false,
    showSymbol = true,
    loadingContent = '...',
  } = props;

  const { data, error, isLoading: loading } = useCryptoCurrency({ symbol });

  const valueBn = useMemo(
    () =>
      formatted
        ? ethers.utils.parseUnits(
            BigNumber.from(value || '0')?.toString() || '0',
            decimals,
          )
        : BigNumber.from(value || '0'),
    [formatted, decimals, value],
  );

  const targetUnitValue = useMemo(() => {
    try {
      return ethers.utils.formatUnits(valueBn, outputUnit || decimals);
    } catch (e) {
      debugger;
      console.error(`Error parsing value: `, valueBn, e);
    }
  }, [decimals, outputUnit, valueBn]);

  const fractions = useMemo(() => {
    try {
      return Math.max(
        fractionDigits !== undefined
          ? fractionDigits
          : symbol?.toString().toLowerCase().endsWith('eth')
          ? decimals === CryptoUnits.ETHER
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
  }, [fractionDigits, symbol, decimals, targetUnitValue]);

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
      {valueToRenderFormatted
        ? Number(valueToRenderFormatted).toLocaleString()
        : '...'}{' '}
      {showSymbol ? outputUnit || data.info?.icon || symbol : null}
      {showPrice && data.price && Number(data.price) > 0 ? (
        <>
          {' '}
          (~
          <CryptoPrice
            value={valueBn}
            formatted={false}
            fractionDigits={1}
            symbol={symbol}
            decimals={decimals}
          />
          )
        </>
      ) : null}
    </>
  );
};
