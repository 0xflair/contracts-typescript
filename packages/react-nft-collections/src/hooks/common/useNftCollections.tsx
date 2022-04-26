import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
};

export function useNftCollections<TConfig extends Record<string, any>>({
  env = Environment.PROD,
  enabled = false,
}: Config | undefined = {}) {
  const loginJwt = useLoginJwt();
  const url = `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections`;

  return useAxiosGet<NftCollection<TConfig>[]>({
    url,
    enabled: Boolean(enabled && loginJwt),
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
