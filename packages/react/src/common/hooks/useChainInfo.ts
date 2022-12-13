import { FLAIR_CHAINS } from '@flair-sdk/common';
import { Chain } from '@wagmi/chains';

export const useChainInfo = (chainId?: number) => {
  return FLAIR_CHAINS.find((chain) => chain.id === chainId) as
    | Chain
    | undefined;
};
