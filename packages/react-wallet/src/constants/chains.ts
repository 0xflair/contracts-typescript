import { allChains as WagmiChains, Chain } from 'wagmi';

export const FLAIR_CHAINS: Chain[] = WagmiChains;

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
