import { allChains, Chain } from '@wagmi/core';

// TODO: Move these to wagmi repo itself
// https://github.com/wagmi-dev/wagmi/blob/0.6.x/packages/core/src/constants/chains.ts#L234
const newChains = [
  {
    id: 56,
    name: 'Binance Mainnet',
    network: 'bsc',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: {
      default: 'https://bsc-dataseed1.binance.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'BSC Scan',
        url: 'https://testnet.bscscan.com',
      },
      default: {
        name: 'BSC Scan',
        url: 'https://testnet.bscscan.com',
      },
    },
  },
  {
    id: 97,
    name: 'Binance Testnet',
    network: 'bscTestnet',
    nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
    rpcUrls: {
      default: 'https://data-seed-prebsc-1-s3.binance.org:8545',
    },
    blockExplorers: {
      etherscan: {
        name: 'BSC Scan',
        url: 'https://testnet.bscscan.com',
      },
      default: {
        name: 'BSC Scan',
        url: 'https://testnet.bscscan.com',
      },
    },
    testnet: true,
  },
  {
    id: 66,
    name: 'OKC Mainnet',
    network: 'okcMainnet',
    nativeCurrency: { name: 'OKT', symbol: 'OKT', decimals: 18 },
    rpcUrls: {
      default: 'https://exchainrpc.okex.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'OKLink',
        url: 'https://www.oklink.com/en/okc',
      },
      default: {
        name: 'OKLink',
        url: 'https://www.oklink.com/en/okc',
      },
    },
  },
  {
    id: 65,
    name: 'OKC Testnet',
    network: 'okcTestnet',
    nativeCurrency: { name: 'OKT', symbol: 'OKT', decimals: 18 },
    rpcUrls: {
      default: 'https://exchaintestrpc.okex.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'OKLink',
        url: 'https://www.oklink.com/en/okc-test',
      },
      default: {
        name: 'OKLink',
        url: 'https://www.oklink.com/en/okc-test',
      },
    },
    testnet: true,
  },
  {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://api.avax.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      etherscan: {
        name: 'Snowtrace',
        url: 'https://snowtrace.io',
      },
      default: {
        name: 'Snowtrace',
        url: 'https://snowtrace.io',
      },
    },
  },
  {
    id: 43_113,
    name: 'Avalanche FUJI',
    network: 'avalancheFuji',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://api.avax-test.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      etherscan: {
        name: 'Snowtrace',
        url: 'https://testnet.snowtrace.io',
      },
      default: {
        name: 'Snowtrace',
        url: 'https://testnet.snowtrace.io',
      },
    },
    testnet: true,
  },
  {
    id: 250,
    name: 'Fantom',
    network: 'fantomOpera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.ankr.com/fantom',
    },
    blockExplorers: {
      etherscan: {
        name: 'FtmScan',
        url: 'https://ftmscan.com',
      },
      default: {
        name: 'FtmScan',
        url: 'https://ftmscan.com',
      },
    },
  },
  {
    id: 4002,
    name: 'Fantom Testnet',
    network: 'fantomTestnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.testnet.fantom.network',
    },
    blockExplorers: {
      etherscan: {
        name: 'FtmScan',
        url: 'https://testnet.ftmscan.com',
      },
      default: {
        name: 'FtmScan',
        url: 'https://testnet.ftmscan.com',
      },
    },
    testnet: true,
  },
  {
    id: 1313161554,
    name: 'Near (Aurora)',
    network: 'aurora',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://mainnet.aurora.dev',
    },
    blockExplorers: {
      etherscan: {
        name: 'AuroraScan',
        url: 'https://aurorascan.dev',
      },
      default: {
        name: 'AuroraScan',
        url: 'https://aurorascan.dev',
      },
    },
  },
  {
    id: 1313161555,
    name: 'Near (Aurora) Testnet',
    network: 'auroraTestnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://testnet.aurora.dev',
    },
    blockExplorers: {
      etherscan: {
        name: 'AuroraScan',
        url: 'https://testnet.aurorascan.dev',
      },
      default: {
        name: 'AuroraScan',
        url: 'https://testnet.aurorascan.dev',
      },
    },
    testnet: true,
  },
  {
    id: 245022926,
    name: 'Solana (Neon Devnet)',
    network: 'neonDevnet',
    nativeCurrency: {
      name: 'NEON',
      symbol: 'NEON',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://proxy.devnet.neonlabs.org/solana',
    },
    blockExplorers: {
      etherscan: {
        name: 'NeonScan',
        url: 'https://neonscan.org',
      },
      default: {
        name: 'NeonScan',
        url: 'https://neonscan.org',
      },
    },
    testnet: true,
  },
  {
    id: 9000,
    name: 'Evmos Testnet',
    network: 'evmosTestnet',
    nativeCurrency: {
      name: 'tEVMOS',
      symbol: 'tEVMOS',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://eth.bd.evmos.dev:8545',
    },
    blockExplorers: {
      etherscan: {
        name: 'Evmos explorer',
        url: 'https://evm.evmos.dev',
      },
      default: {
        name: 'Evmos explorer',
        url: 'https://evm.evmos.dev',
      },
    },
    testnet: true,
  },
  {
    id: 9001,
    name: 'Evmos Mainnet',
    network: 'evmosMainnet',
    nativeCurrency: {
      name: 'EVMOS',
      symbol: 'EVMOS',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://eth.bd.evmos.org:8545',
    },
    blockExplorers: {
      etherscan: {
        name: 'Evmos explorer',
        url: 'https://evm.evmos.org',
      },
      default: {
        name: 'Evmos explorer',
        url: 'https://evm.evmos.org',
      },
    },
  },
  {
    id: 1284,
    name: 'Moonbeam',
    network: 'moonbeam',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.api.moonbeam.network',
    },
    blockExplorers: {
      etherscan: {
        name: 'Moonscan',
        url: 'https://moonscan.io',
      },
      default: {
        name: 'Moonscan',
        url: 'https://moonscan.io',
      },
    },
  },
  {
    id: 1285,
    name: 'Moonriver',
    network: 'moonriver',
    nativeCurrency: {
      name: 'MOVR',
      symbol: 'MOVR',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.api.moonriver.moonbeam.network',
    },
    blockExplorers: {
      etherscan: {
        name: 'Moonscan',
        url: 'https://moonriver.moonscan.io',
      },
      default: {
        name: 'Moonscan',
        url: 'https://moonriver.moonscan.io',
      },
    },
  },
  {
    id: 280,
    name: 'zkSync 2.0 Testnet',
    network: 'zkSyncTestnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://zksync2-testnet.zksync.dev',
    },
    blockExplorers: {
      etherscan: {
        name: 'zkScan',
        url: 'https://zksync2-testnet.zkscan.io',
      },
      default: {
        name: 'zkScan',
        url: 'https://zksync2-testnet.zkscan.io',
      },
    },
    testnet: true,
  },
  {
    id: 25,
    name: 'Cronos Mainnet',
    network: 'cronos',
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://node.croswap.com/rpc',
    },
    blockExplorers: {
      etherscan: {
        name: 'Cronos Chain explorer',
        url: 'https://cronoscan.com',
      },
      default: {
        name: 'Cronos Chain explorer',
        url: 'https://cronoscan.com',
      },
    },
  },
  {
    id: 338,
    name: 'Cronos Testnet',
    network: 'cronosTestnet',
    nativeCurrency: {
      name: 'TCRO',
      symbol: 'TCRO',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://evm-t3.cronos.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'Cronos Chain Testnet explorer',
        url: 'https://testnet.cronoscan.com',
      },
      default: {
        name: 'Cronos Chain Testnet explorer',
        url: 'https://testnet.cronoscan.com',
      },
    },
    testnet: true,
  },
  {
    id: 42220,
    name: 'Celo Mainnet',
    network: 'celo',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://forno.celo.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'Celo explorer',
        url: 'https://explorer.celo.org',
      },
      default: {
        name: 'Celo explorer',
        url: 'https://explorer.celo.org',
      },
    },
  },
  {
    id: 44787,
    name: 'Celo Testnet Alfajores',
    network: 'celoAlfajores',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://alfajores-forno.celo-testnet.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'Celo explorer',
        url: 'https://alfajores-blockscout.celo-testnet.org',
      },
      default: {
        name: 'Celo explorer',
        url: 'https://alfajores-blockscout.celo-testnet.org',
      },
    },
    testnet: true,
  },
  {
    id: 42170,
    name: 'Arbitrum Nova',
    network: 'arbitrumNova',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://nova.arbitrum.io/rpc',
    },
    blockExplorers: {
      etherscan: {
        name: 'Arbitrum Nova explorer',
        url: 'https://nova-explorer.arbitrum.io',
      },
      default: {
        name: 'Arbitrum Nova explorer',
        url: 'https://nova-explorer.arbitrum.io',
      },
    },
  },
  {
    id: 40,
    name: 'Telos',
    network: 'telos',
    nativeCurrency: {
      name: 'TLOS',
      symbol: 'TLOS',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://mainnet.telos.net/evm',
    },
    blockExplorers: {
      etherscan: {
        name: 'Telos explorer',
        url: 'https://www.teloscan.io',
      },
      default: {
        name: 'Telos explorer',
        url: 'https://www.teloscan.io',
      },
    },
  },
  {
    id: 41,
    name: 'Telos Testnet',
    network: 'telosTestnet',
    nativeCurrency: {
      name: 'TLOS',
      symbol: 'TLOS',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://testnet.telos.net/evm',
    },
    blockExplorers: {
      etherscan: {
        name: 'Telos explorer',
        url: 'https://testnet.teloscan.io',
      },
      default: {
        name: 'Telos explorer',
        url: 'https://testnet.teloscan.io',
      },
    },
    testnet: true,
  },
  {
    id: 42262,
    name: 'Oasis Emerald',
    network: 'oasisEmerald',
    nativeCurrency: {
      name: 'ROSE',
      symbol: 'ROSE',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://emerald.oasis.dev',
    },
    blockExplorers: {
      etherscan: {
        name: 'Oasis explorer',
        url: 'https://explorer.emerald.oasis.dev',
      },
      default: {
        name: 'Oasis explorer',
        url: 'https://explorer.emerald.oasis.dev',
      },
    },
  },
  {
    id: 42261,
    name: 'Oasis Emerald Testnet',
    network: 'oasisEmeraldTestnet',
    nativeCurrency: {
      name: 'ROSE',
      symbol: 'ROSE',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://testnet.emerald.oasis.dev',
    },
    blockExplorers: {
      etherscan: {
        name: 'Oasis Emerald explorer',
        url: 'https://testnet.explorer.emerald.oasis.dev',
      },
      default: {
        name: 'Oasis Emerald explorer',
        url: 'https://testnet.explorer.emerald.oasis.dev',
      },
    },
    testnet: true,
  },
];

const WagmiChains = allChains.filter((c) => ![3, 4, 421611].includes(c.id));

export const FLAIR_CHAINS: Chain[] = [...WagmiChains, ...newChains];

export const FLAIR_DEFAULT_CHAIN = FLAIR_CHAINS.find(
  (c) => c.id === 1 /* ethereum */,
) as Chain;
