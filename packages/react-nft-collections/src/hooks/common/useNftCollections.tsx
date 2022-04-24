import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type Config = {
  skip?: boolean;
  env?: Environment;
};

export function useNftCollections<TConfig extends Record<string, any>>({
  skip = false,
  env = Environment.PROD,
}: Config | undefined = {}) {
  const url = `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections`;

  const loginJwt = useLoginJwt();

  const [{ data, loading, error }, sendRequest] = useAxiosGet<
    NftCollection<TConfig>[]
  >({
    url,
    skip,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });

  return [{ data, loading, error }, sendRequest] as const;
}
