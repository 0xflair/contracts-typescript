import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import { useMemo } from 'react';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type UpdaterConfig = {
  env?: Environment;
  enabled?: boolean;
};

export function useNftCollectionCreator<TConfig extends Record<string, any>>(
  collection: Partial<NftCollection<TConfig>>,
  { enabled = true, env = Environment.PROD }: UpdaterConfig
) {
  const loginJwt = useLoginJwt();
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  return useAxiosPost<NftCollection<TConfig>>({
    url: `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections`,
    enabled: Boolean(enabled && loginJwt),
    data: collection,
    headers,
  });
}
