import { FLAIR_CHAINS } from '@flair-sdk/common';
import * as React from 'react';

export const useChainInfo = (chainId?: number) => {
  return FLAIR_CHAINS.find((chain) => chain.id === chainId);
};
