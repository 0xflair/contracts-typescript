import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import { useMemo } from 'react';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
};

export function useNftCollections<TConfig extends Record<string, any>>({
  env = Environment.PROD,
  enabled = true,
}: Config | undefined = {}) {
  const loginJwt = useLoginJwt();
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  const url = `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections`;

  return useAxiosGet<NftCollection<TConfig>[]>({
    url,
    enabled: Boolean(enabled && loginJwt),
    headers,
  });
}
