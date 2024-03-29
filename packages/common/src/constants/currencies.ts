import { BaseCurrency, CryptoCurrency } from '../types/currencies';
import { ChainId } from './chain-id';

export const KNOWN_BASE_CURRENCIES: BaseCurrency[] = ['USD'];

export const KNOWN_CRYPTO_CURRENCIES: CryptoCurrency[] = [
  {
    nativeChainIds: [
      ChainId.ETHEREUM_MAINNET,
      ChainId.ETHEREUM_GOERLI,
      ChainId.ETHEREUM_SEPOLIA,
      ChainId.ARBITRUM_ONE,
      ChainId.ARBITRUM_NOVA,
      ChainId.ARBITRUM_GOERLI,
      ChainId.OPTIMISM,
      ChainId.OPTIMISM_GOERLI,
    ],
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'ETH',
    coinGeckoId: 'ethereum',
    coinMarketCapSymbol: 'ETH',
  },
  {
    nativeChainIds: [ChainId.POLYGON_MATIC, ChainId.POLYGON_MUMBAI],
    symbol: 'MATIC',
    name: 'Matic',
    icon: 'MATIC',
    coinGeckoId: 'matic-network',
    coinMarketCapSymbol: 'MATIC',
  },
  {
    nativeChainIds: [ChainId.AVALANCHE_C_CHAIN, ChainId.AVALANCHE_FUJI_TESTNET],
    symbol: 'AVAX',
    name: 'AVAX',
    icon: 'AVAX',
    coinGeckoId: 'avalanche-2',
    coinMarketCapSymbol: 'AVAX',
  },
  {
    nativeChainIds: [
      ChainId.NEON_MAINNET,
      ChainId.NEON_TESTNET,
      ChainId.NEON_DEVNET,
    ],
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
    nativeChainIds: [ChainId.FANTOM_MAINNET, ChainId.FANTOM_TESTNET],
    symbol: 'FTM',
    name: 'FTM',
    icon: 'FTM',
    coinGeckoId: 'fantom',
    coinMarketCapSymbol: 'FTM',
  },
  {
    nativeChainIds: [ChainId.EVMOS_MAINNET, ChainId.EVMOS_TESTNET],
    symbol: 'EVMOS',
    name: 'EVMOS',
    icon: 'EVMOS',
    coinGeckoId: 'evmos',
    coinMarketCapSymbol: 'EVMOS',
  },
  {
    nativeChainIds: [ChainId.MOONBEAM],
    symbol: 'GLMR',
    name: 'GLMR',
    icon: 'GLMR',
    coinGeckoId: 'moonbeam',
    coinMarketCapSymbol: 'GLMR',
  },
  {
    nativeChainIds: [ChainId.MOONRIVER],
    symbol: 'MOVR',
    name: 'MOVR',
    icon: 'MOVR',
    coinGeckoId: 'moonriver',
    coinMarketCapSymbol: 'MOVR',
  },
  {
    nativeChainIds: [
      ChainId.BINANCE_CHAIN_MAINNET,
      ChainId.BINANCE_CHAIN_TESTNET,
    ],
    symbol: 'BNB',
    name: 'BNB',
    icon: 'BNB',
    coinGeckoId: 'binancecoin',
    coinMarketCapSymbol: 'BNB',
  },
  {
    nativeChainIds: [ChainId.FUSE_MAINNET, ChainId.FUSE_SPARKNET],
    symbol: 'FUSE',
    name: 'FUSE',
    icon: 'FUSE',
    coinGeckoId: 'fuse-network-token',
    coinMarketCapSymbol: 'FUSE',
  },
  {
    nativeChainIds: [ChainId.TELOS_MAINNET, ChainId.TELOS_TESTNET],
    symbol: 'TLOS',
    name: 'TELOS',
    icon: 'TLOS',
    coinGeckoId: 'telos',
    coinMarketCapSymbol: 'TLOS',
  },
  {
    nativeChainIds: [ChainId.OKC_MAINNET],
    symbol: 'OKT',
    name: 'OKT',
    icon: 'OKT',
    coinGeckoId: 'okc-token',
    coinMarketCapSymbol: 'OKT',
  },
  {
    nativeChainIds: [ChainId.OASIS_EMERALD_MAINNET],
    symbol: 'ROSE',
    name: 'ROSE',
    icon: 'ROSE',
    coinGeckoId: 'oasis-network',
    coinMarketCapSymbol: 'ROSE',
  },
  {
    nativeChainIds: [ChainId.CELO_MAINNET, ChainId.CELO_ALFAJORES],
    symbol: 'CELO',
    name: 'CELO',
    icon: 'CELO',
    coinGeckoId: 'celo',
    coinMarketCapSymbol: 'CELO',
  },
  {
    nativeChainIds: [ChainId.CRONOS_MAINNET, ChainId.CRONOS_TESTNET],
    symbol: 'CRO',
    name: 'CRO',
    icon: 'CRO',
    coinGeckoId: 'crypto-com-chain',
    coinMarketCapSymbol: 'CRO',
  },
  {
    nativeChainIds: [ChainId.METIS_MAINNET, ChainId.METIS_GOERLI],
    symbol: 'METIS',
    name: 'METIS',
    icon: 'METIS',
    coinGeckoId: 'metis-token',
    coinMarketCapSymbol: 'METIS',
  },
  {
    nativeChainIds: [ChainId.HORIZON_EON_TESTNET, ChainId.HORIZON_EON_TESTNET],
    symbol: 'ZEN',
    name: 'ZEN',
    icon: 'ZEN',
    coinGeckoId: 'zencash',
    coinMarketCapSymbol: 'ZEN',
  },
];
