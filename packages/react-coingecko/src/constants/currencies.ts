import { BaseCurrency, CryptoCurrency } from '../types';

export const KNOWN_BASE_CURRENCIES: BaseCurrency[] = ['USD'];

export const KNOWN_CRYPTO_CURRENCIES: CryptoCurrency[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    coinGeckoId: 'ethereum',
  },
  {
    symbol: 'MATIC',
    name: 'Matic',
    icon: '$MATIC',
    coinGeckoId: 'matic-network',
  },
];
