import { BaseCurrency, CryptoCurrency } from '../types';

export const KNOWN_BASE_CURRENCIES: BaseCurrency[] = ['USD'];

export const KNOWN_CRYPTO_CURRENCIES: CryptoCurrency[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'ETH',
    coinGeckoId: 'ethereum',
    coinMarketCapSymbol: 'ETH',
  },
  {
    symbol: 'MATIC',
    name: 'Matic',
    icon: 'MATIC',
    coinGeckoId: 'matic-network',
    coinMarketCapSymbol: 'MATIC',
  },
  {
    symbol: 'AVAX',
    name: 'AVAX',
    icon: 'AVAX',
    coinGeckoId: 'avalanche-2',
    coinMarketCapSymbol: 'AVAX',
  },
  {
    symbol: 'NEON',
    name: 'NEON',
    icon: 'NEON',
    coinGeckoId: 'solana', // TODO change to neon labs
    coinMarketCapSymbol: 'NEON',
  },
  {
    symbol: 'NEAR',
    name: 'NEAR',
    icon: 'NEAR',
    coinGeckoId: 'near',
    coinMarketCapSymbol: 'NEAR',
  },
  {
    symbol: 'FTM',
    name: 'FTM',
    icon: 'FTM',
    coinGeckoId: 'fantom',
    coinMarketCapSymbol: 'FTM',
  },
  {
    symbol: 'EVMOS',
    name: 'EVMOS',
    icon: 'EVMOS',
    coinGeckoId: 'evmos',
    coinMarketCapSymbol: 'EVMOS',
  },
  {
    symbol: 'GLMR',
    name: 'GLMR',
    icon: 'GLMR',
    coinGeckoId: 'moonbeam',
    coinMarketCapSymbol: 'GLMR',
  },
  {
    symbol: 'MOVR',
    name: 'MOVR',
    icon: 'MOVR',
    coinGeckoId: 'moonriver',
    coinMarketCapSymbol: 'MOVR',
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    icon: 'BNB',
    coinGeckoId: 'binancecoin',
    coinMarketCapSymbol: 'BNB',
  },
  {
    symbol: 'FUSE',
    name: 'FUSE',
    icon: 'FUSE',
    coinGeckoId: 'fuse',
    coinMarketCapSymbol: 'FUSE',
  },
  {
    symbol: 'TLOS',
    name: 'TELOS',
    icon: 'TLOS',
    coinGeckoId: 'telos',
    coinMarketCapSymbol: 'TLOS',
  },
  {
    symbol: 'OKT',
    name: 'OKT',
    icon: 'OKT',
    coinGeckoId: 'okc-token',
    coinMarketCapSymbol: 'OKT',
  },
  {
    symbol: 'ROSE',
    name: 'ROSE',
    icon: 'ROSE',
    coinGeckoId: 'oasis-network',
    coinMarketCapSymbol: 'ROSE',
  },
  {
    symbol: 'CELO',
    name: 'CELO',
    icon: 'CELO',
    coinGeckoId: 'celo',
    coinMarketCapSymbol: 'CELO',
  },
  {
    symbol: 'CRO',
    name: 'CRO',
    icon: 'CRO',
    coinGeckoId: 'crypto-com-chain',
    coinMarketCapSymbol: 'CRO',
  },
];
