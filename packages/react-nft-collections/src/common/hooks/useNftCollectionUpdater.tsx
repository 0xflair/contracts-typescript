import { Environment, useAxiosPatch } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import { useMemo } from 'react';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type UpdaterConfig = {
  env?: Environment;
  enabled?: boolean;
};

export function useNftCollectionUpdater<
  TCollectionConfig extends Record<string, any>
>(
  collection: Partial<NftCollection<TCollectionConfig>>,
  { enabled = true, env = Environment.PROD }: UpdaterConfig
) {
  const loginJwt = useLoginJwt();
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  return useAxiosPatch<NftCollection<TCollectionConfig>>({
    url: `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections/${collection._id}`,
    enabled: Boolean(enabled && loginJwt && collection?._id),
    data: collection,
    headers,
  });
}
