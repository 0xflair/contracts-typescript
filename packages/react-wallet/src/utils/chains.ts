import { allChains as WagmiChains, Chain } from "wagmi";

export const FLAIR_CHAIN_IDS = [137 /* polygonMainnet */, 4 /* rinkeby */];
export const FLAIR_CHAINS: Chain[] = WagmiChains.filter((chain) => FLAIR_CHAIN_IDS.includes(chain.id));
export const FLAIR_DEFAULT_CHAIN = FLAIR_CHAINS.find(
  (c) => c.id === 4 /* rinkeby */
) as Chain;

export const FLAIR_CHAIN_MACHINE_NAMES = {
  1: 'mainnet',
  4: 'rinkeby',
  137: 'matic',
  80001: 'mumbai',
}
