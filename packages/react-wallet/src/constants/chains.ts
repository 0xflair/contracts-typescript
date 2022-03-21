import { chain as WagmiChains, Chain } from "wagmi-core";

type ChainName = keyof typeof WagmiChains;

export const FLAIR_CHAIN_NAMES: ChainName[] = ["polygonMainnet", "rinkeby"];
export const FLAIR_CHAINS: Chain[] = Object.values(WagmiChains).filter(
  (chain) => FLAIR_CHAIN_NAMES.includes(chain.name as ChainName)
);
