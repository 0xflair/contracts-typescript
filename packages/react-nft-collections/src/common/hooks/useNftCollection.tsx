import { Environment, useAxiosGet } from '@0xflair/react-common';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
  chainId?: number;
  contractAddress?: string;
  collectionId?: string;
};

export function useNftCollection<
  TCollectionConfig extends Record<string, any>,
>({
  env = Environment.PROD,
  enabled = true,
  collectionId,
  chainId,
  contractAddress,
}: Config) {
  const url = collectionId
    ? `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections/${collectionId}`
    : `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections/${chainId}/${contractAddress}`;

  return useAxiosGet<NftCollection<TCollectionConfig>>({
    url,
    enabled: Boolean(enabled && (collectionId || (chainId && contractAddress))),
  });
}
