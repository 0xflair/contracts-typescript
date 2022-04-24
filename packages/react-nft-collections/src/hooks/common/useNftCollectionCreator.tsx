import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type UpdaterConfig = {
  skip?: boolean;
  env?: Environment;
};

export function useNftCollectionCreator<TConfig extends Record<string, any>>(
  collection: Partial<NftCollection<TConfig>>,
  { skip = false, env = Environment.PROD }: UpdaterConfig
) {
  const loginJwt = useLoginJwt();

  const [{ data, loading, error }, sendPost] = useAxiosPost<
    NftCollection<TConfig>
  >({
    url: `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections`,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
    data: collection,
    skip,
  });

  return [{ data, loading, error }, sendPost] as const;
}
