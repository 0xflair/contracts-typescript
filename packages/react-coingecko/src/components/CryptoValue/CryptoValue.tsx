import * as ethers from 'ethers';
import { BigNumberish } from 'ethers';
import { ReactNode } from 'react';

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

  const valueBn = ethers.utils.parseUnits(value?.toString() || '0', unit);
  const etherValue = ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);

  const fractions = Math.max(
    fractionDigits !== undefined
      ? fractionDigits
      : symbol?.toString().toLowerCase().endsWith('eth')
      ? 4
      : 2,
    (etherValue?.match(/^(0|\.)+/)?.[0]?.length || 3) - 1,
  );

  if (error) {
    console.warn(`Could not fetch price for ${symbol}: `, error);
  }

  const valueToRender = Number(etherValue)
    .toFixed(fractions)
    .toString()
    .replace(/[0\.]+$/, '');

  return loading ? (
    <>{loadingContent}</>
  ) : (
    <>
      {valueToRender} {showSymbol ? data.info?.icon || symbol : null}
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
