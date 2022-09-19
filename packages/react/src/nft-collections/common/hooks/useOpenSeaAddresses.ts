import { ZERO_ADDRESS } from '@flair-sdk/common';

import { useChainId } from '../../../common';
import {
  FLAIR_OPENSEA_ADDRESSES,
  SupportedOpenSeaChains,
} from '../../constants';

export const useOpenSeaAddresses = (chainId?: number) => {
  const resolvedChainId = useChainId(chainId) as
    | SupportedOpenSeaChains
    | undefined;

  return {
    openSeaProxyRegistryAddress:
      resolvedChainId &&
      FLAIR_OPENSEA_ADDRESSES[resolvedChainId] &&
      FLAIR_OPENSEA_ADDRESSES[resolvedChainId].registryAddress
        ? FLAIR_OPENSEA_ADDRESSES[resolvedChainId].registryAddress
        : ZERO_ADDRESS,
    openSeaExchangeAddress:
      resolvedChainId &&
      FLAIR_OPENSEA_ADDRESSES[resolvedChainId] &&
      FLAIR_OPENSEA_ADDRESSES[resolvedChainId].exchangeAddress
        ? FLAIR_OPENSEA_ADDRESSES[resolvedChainId].exchangeAddress
        : ZERO_ADDRESS,
  } as const;
};
