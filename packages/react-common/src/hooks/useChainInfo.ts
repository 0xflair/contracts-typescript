import * as React from 'react';

import { FLAIR_CHAINS } from '../constants/chains';

export const useChainInfo = (chainId?: number) => {
  return FLAIR_CHAINS.find((chain) => chain.id === chainId);
};
