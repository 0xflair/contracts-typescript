import * as React from 'react';

import { ALL_CURRENCIES } from '../constants';

export const useCryptoCurrency = (symbol?: string) => {
  return ALL_CURRENCIES.find((c) =>
    symbol?.toLowerCase().endsWith(c.symbol.toLowerCase())
  );
};
