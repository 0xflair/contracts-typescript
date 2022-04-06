import * as React from 'react';
import { allChains } from 'wagmi';

export const useChainInfo = (chainId?: number) => {
  return allChains.find((chain) => chain.id === chainId);
};
