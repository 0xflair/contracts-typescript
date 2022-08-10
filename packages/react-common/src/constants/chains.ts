import { allChains as WagmiChains, Chain } from 'wagmi';

// TODO: Move these to wagmi repo itself
// https://github.com/wagmi-dev/wagmi/blob/0.3.x/packages/core/src/constants/chains.ts#L234
const newChains = [
  {
    id: 56,
    name: 'Binance Mainnet',
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
    nativeCurrency: { name: 'OKT', symbol: 'OKT', decimals: 18 },
    rpcUrls: {
      default: 'https://exchainrpc.okex.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://www.oklink.com/en/okc',
      },
      default: {
        name: 'default',
        url: 'https://www.oklink.com/en/okc',
      },
    },
  },
  {
    id: 65,
    name: 'OKC Testnet',
    nativeCurrency: { name: 'OKT', symbol: 'OKT', decimals: 18 },
    rpcUrls: {
      default: 'https://exchaintestrpc.okex.org',
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://www.oklink.com/en/okc-test',
      },
      default: {
        name: 'default',
        url: 'https://www.oklink.com/en/okc-test',
      },
    },
    testnet: true,
  },
  {
    id: 43_114,
    name: 'Avalanche',
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
        name: 'Etherscan',
        url: 'https://snowtrace.io',
      },
      default: {
        name: 'default',
        url: 'https://snowtrace.io',
      },
    },
  },
  {
    id: 43_113,
    name: 'Avalanche FUJI',
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
        name: 'Etherscan',
        url: 'https://testnet.snowtrace.io',
      },
      default: {
        name: 'default',
        url: 'https://testnet.snowtrace.io',
      },
    },
    testnet: true,
  },
  {
    id: 250,
    name: 'Fantom',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.ankr.com/fantom/',
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://ftmscan.com',
      },
      default: {
        name: 'default',
        url: 'https://ftmscan.com',
      },
    },
  },
  {
    id: 4002,
    name: 'Fantom Testnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.testnet.fantom.network/',
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://testnet.ftmscan.com',
      },
      default: {
        name: 'default',
        url: 'https://testnet.ftmscan.com',
      },
    },
    testnet: true,
  },
  {
    id: 1313161554,
    name: 'Near (Aurora)',
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
        name: 'Etherscan',
        url: 'https://aurorascan.dev',
      },
      default: {
        name: 'default',
        url: 'https://aurorascan.dev',
      },
    },
  },
  {
    id: 1313161555,
    name: 'Near (Aurora) Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://testnet.aurora.dev/',
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://testnet.aurorascan.dev',
      },
      default: {
        name: 'default',
        url: 'https://testnet.aurorascan.dev',
      },
    },
    testnet: true,
  },
  {
    id: 245022926,
    name: 'Solana (Neon Devnet)',
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
        name: 'Etherscan',
        url: 'https://neonscan.org',
      },
      default: {
        name: 'default',
        url: 'https://neonscan.org',
      },
    },
    testnet: true,
  },
  {
    id: 9000,
    name: 'Evmos Testnet',
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
        name: 'Etherscan',
        url: 'https://evm.evmos.dev',
      },
      default: {
        name: 'default',
        url: 'https://evm.evmos.dev',
      },
    },
    testnet: true,
  },
  {
    id: 9001,
    name: 'Evmos Mainnet',
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
        name: 'Etherscan',
        url: 'https://evm.evmos.org',
      },
      default: {
        name: 'default',
        url: 'https://evm.evmos.org',
      },
    },
  },
  {
    id: 1284,
    name: 'Moonbeam',
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
        name: 'Etherscan',
        url: 'https://moonscan.io',
      },
      default: {
        name: 'default',
        url: 'https://moonscan.io',
      },
    },
  },
  {
    id: 1285,
    name: 'Moonriver',
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
        name: 'Etherscan',
        url: 'https://moonriver.moonscan.io',
      },
      default: {
        name: 'default',
        url: 'https://moonriver.moonscan.io',
      },
    },
  },
];

export const FLAIR_CHAINS: Chain[] = [...WagmiChains, ...newChains];

export const FLAIR_DEFAULT_CHAIN = FLAIR_CHAINS.find(
  (c) => c.id === 4 /* rinkeby */,
) as Chain;

export const FLAIR_CHAIN_MACHINE_NAMES = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  137: 'matic',
  80001: 'mumbai',
};
