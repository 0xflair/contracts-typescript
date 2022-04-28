import * as ethers from 'ethers';
import { BigNumberish } from 'ethers';
import React from 'react';

import { useCryptoInfo } from '../../hooks';
import { CryptoSymbol, CryptoUnits } from '../../types';
import { CryptoPrice } from '../CryptoPrice/CryptoPrice';

type Props = {
  value?: BigNumberish;
  fractionDigits?: number;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
  showPrice?: boolean;
};

export const CryptoValue = (props: Props) => {
  const {
    value = '1',
    fractionDigits,
    unit = CryptoUnits.ETHER,
    symbol = CryptoSymbol.ETH,
    showPrice = true,
  } = props;

  const cryptoCurrency = useCryptoInfo(symbol);

  const fractions = fractionDigits || (symbol === CryptoSymbol.ETH ? 4 : 2);
  const valueBn = ethers.utils.parseUnits(value?.toString() || '0', unit);
  const etherValue = ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);

  return (
    <>
      {Number(etherValue).toFixed(fractions)} {cryptoCurrency?.icon || symbol}
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
