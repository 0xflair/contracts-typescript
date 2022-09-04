import { FLAIR_CHAINS } from '@0xflair/common';
import * as React from 'react';

export const useChainInfo = (chainId?: number) => {
  return FLAIR_CHAINS.find((chain) => chain.id === chainId);
};
