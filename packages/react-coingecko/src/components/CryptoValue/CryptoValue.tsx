import * as ethers from 'ethers';
import { BigNumberish } from 'ethers';
import React, { ReactNode } from 'react';

import { useCryptoCurrency } from '../../hooks';
import { CryptoSymbol, CryptoUnits } from '../../types';
import { CryptoPrice } from '../CryptoPrice/CryptoPrice';

type Props = {
  value?: BigNumberish;
  fractionDigits?: number;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
  showPrice?: boolean;
  loadingContent?: ReactNode;
};

export const CryptoValue = (props: Props) => {
  const {
    value = '1',
    fractionDigits,
    unit = CryptoUnits.ETHER,
    symbol = 'ETH',
    showPrice = true,
    loadingContent = '...',
  } = props;

  const { data, error, loading } = useCryptoCurrency({ symbol });

  const fractions = fractionDigits || (symbol === 'ETH' ? 4 : 2);
  const valueBn = ethers.utils.parseUnits(value?.toString() || '0', unit);
  const etherValue = ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);

  if (error) {
    console.warn(`Could not fetch price for ${symbol}: `, error);
  }

  return loading ? (
    <>{loadingContent}</>
  ) : (
    <>
      {Number(etherValue).toFixed(fractions)} {data.info?.icon || symbol}
      {showPrice && (
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
      )}
    </>
  );
};
