import { Chain } from '@wagmi/chains';

import { FLAIR_CHAINS } from '@flair-sdk/common';

export const useChainInfo = (chainId?: number) => {
  return FLAIR_CHAINS.find((chain) => chain.id === chainId) as
    | Chain
    | undefined;
};
