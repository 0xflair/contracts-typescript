import * as React from 'react';

import { CryptoCurrency, CryptoSymbol } from '../types';

export const ALL_CURRENCIES: CryptoCurrency[] = [
  {
    symbol: CryptoSymbol.ETH,
    name: 'Ethereum',
    icon: 'Ξ',
    coinGeckoId: 'ethereum',
  },
  {
    symbol: CryptoSymbol.MATIC,
    name: 'Matic',
    icon: '$MATIC',
    coinGeckoId: 'matic-network',
  },
];
