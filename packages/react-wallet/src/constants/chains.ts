import { allChains as WagmiChains, Chain } from 'wagmi';

// TODO: Move these to wagmi repo itself
// https://github.com/wagmi-dev/wagmi/blob/0.3.x/packages/core/src/constants/chains.ts#L234
const newChains = [
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
        url: 'https://www.oklink.com/okc/',
      },
      default: {
        name: 'default',
        url: 'https://www.oklink.com/okc/',
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
        url: 'https://www.oklink.com/okc-test/',
      },
      default: {
        name: 'default',
        url: 'https://www.oklink.com/okc-test/',
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
        url: 'https://snowtrace.io/',
      },
      default: {
        name: 'default',
        url: 'https://snowtrace.io/',
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
        url: 'https://testnet.snowtrace.io/',
      },
      default: {
        name: 'default',
        url: 'https://testnet.snowtrace.io/',
      },
    },
    testnet: true,
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
