import { Environment, useAxiosGet } from '@0xflair/react-common';
import axios from 'axios';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type Config = {
  chainId?: number;
  contractAddress?: string;
  collectionId?: string;
  skip?: boolean;
  env?: Environment;
};

export function useNftCollection<
  TCollectionConfig extends Record<string, any>
>({
  collectionId,
  chainId,
  contractAddress,
  skip = false,
  env = Environment.PROD,
}: Config) {
  const url = collectionId
    ? `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections/${collectionId}`
    : `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections/${chainId}/${contractAddress}`;

  const [{ data, loading, error }, sendGet] = useAxiosGet<
    NftCollection<TCollectionConfig>
  >({
    url,
    skip,
  });

  return [{ data, loading, error }, sendGet] as const;
}
