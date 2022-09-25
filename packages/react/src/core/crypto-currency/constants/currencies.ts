import { BaseCurrency, CryptoCurrency } from '../types';

export const KNOWN_BASE_CURRENCIES: BaseCurrency[] = ['USD'];

export const KNOWN_CRYPTO_CURRENCIES: CryptoCurrency[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'ETH',
    coinGeckoId: 'ethereum',
  },
  {
    symbol: 'MATIC',
    name: 'Matic',
    icon: 'MATIC',
    coinGeckoId: 'matic-network',
  },
  {
    symbol: 'AVAX',
    name: 'AVAX',
    icon: 'AVAX',
    coinGeckoId: 'avalanche-2',
  },
  {
    symbol: 'NEON',
    name: 'NEON',
    icon: 'NEON',
    coinGeckoId: 'solana', // TODO change to neon labs
  },
  {
    symbol: 'NEAR',
    name: 'NEAR',
    icon: 'NEAR',
    coinGeckoId: 'near',
  },
  {
    symbol: 'FTM',
    name: 'FTM',
    icon: 'FTM',
    coinGeckoId: 'fantom',
  },
  {
    symbol: 'EVMOS',
    name: 'EVMOS',
    icon: 'EVMOS',
    coinGeckoId: 'evmos',
  },
  {
    symbol: 'GLMR',
    name: 'GLMR',
    icon: 'GLMR',
    coinGeckoId: 'moonbeam',
  },
  {
    symbol: 'MOVR',
    name: 'MOVR',
    icon: 'MOVR',
    coinGeckoId: 'moonriver',
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    icon: 'BNB',
    coinGeckoId: 'binancecoin',
  },
];
