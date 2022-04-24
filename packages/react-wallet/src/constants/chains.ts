import { allChains as WagmiChains, Chain } from 'wagmi';

export const FLAIR_CHAIN_IDS = [
  1 /* mainnet */, 3 /* ropsten */, 4 /* rinkeby */, 5 /* goerli */,
  137 /* polygonMainnet */, 80001 /* polygonTestnetMumbai */,
];

export const FLAIR_CHAINS: Chain[] = WagmiChains.filter((chain) =>
  FLAIR_CHAIN_IDS.includes(chain.id)
);

export const FLAIR_DEFAULT_CHAIN = FLAIR_CHAINS.find(
  (c) => c.id === 4 /* rinkeby */
) as Chain;

export const FLAIR_CHAIN_MACHINE_NAMES = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  137: 'matic',
  80001: 'mumbai',
};
