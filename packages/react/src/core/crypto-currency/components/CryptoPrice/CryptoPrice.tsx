import * as ethers from 'ethers';
import { BigNumberish } from 'ethers';
import { useMemo } from 'react';

import { useCryptoCurrency } from '../../hooks';
import { CryptoSymbol, CryptoUnits } from '../../types';

type Props = {
  value?: string | BigNumberish;
  fractionDigits?: number;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
};

export const CryptoPrice = (props: Props) => {
  const {
    value = '1',
    fractionDigits = 2,
    unit = CryptoUnits.ETHER,
    symbol = 'ETH',
  } = props;

  const { data } = useCryptoCurrency({
    symbol,
  });

  const etherValue = useMemo(() => {
    try {
      const valueBn = ethers.utils.parseUnits(value?.toString() || '0', unit);
      return ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);
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
    <>{(Number(etherValue) * Number(data.price)).toFixed(fractionDigits)}</>
  ) : null;
};
