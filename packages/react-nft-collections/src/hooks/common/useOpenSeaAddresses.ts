import { ZERO_ADDRESS } from '@0xflair/react-common';
import { useChainId } from 'wagmi/dist/declarations/src/hooks';
import { UseChainIdArgs } from 'wagmi/dist/declarations/src/hooks/utils/useChainId';

import {
  FLAIR_OPENSEA_ADDRESSES,
  SupportedOpenSeaChains,
} from '../../constants';

export const useOpenSeaAddresses = (args?: UseChainIdArgs) => {
  const chain = (useChainId(args) || args?.chainId) as
    | SupportedOpenSeaChains
    | undefined;

  return {
    openSeaProxyRegistryAddress:
      chain &&
      FLAIR_OPENSEA_ADDRESSES[chain] &&
      FLAIR_OPENSEA_ADDRESSES[chain].registryAddress
        ? FLAIR_OPENSEA_ADDRESSES[chain].registryAddress
        : ZERO_ADDRESS,
    openSeaExchangeAddress:
      chain &&
      FLAIR_OPENSEA_ADDRESSES[chain] &&
      FLAIR_OPENSEA_ADDRESSES[chain].exchangeAddress
        ? FLAIR_OPENSEA_ADDRESSES[chain].exchangeAddress
        : ZERO_ADDRESS,
  } as const;
};
