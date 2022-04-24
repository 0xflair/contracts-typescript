import { Environment, useAxiosPatch } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_NFT_COLLECTIONS_BACKEND } from '../../constants';
import { NftCollection } from '../../types';

type UpdaterConfig = {
  skip?: boolean;
  env?: Environment;
};

export function useNftCollectionUpdater<
  TCollectionConfig extends Record<string, any>
>(
  collection: Partial<NftCollection<TCollectionConfig>>,
  { skip = false, env = Environment.PROD }: UpdaterConfig
) {
  const loginJwt = useLoginJwt();

  const [{ data, loading, error }, sendPatch] = useAxiosPatch<
    NftCollection<TCollectionConfig>
  >({
    url: `${FLAIR_NFT_COLLECTIONS_BACKEND[env]}/v1/nft-collections/${collection._id}`,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
    data: collection,
    skip,
  });

  return [{ data, loading, error }, sendPatch] as const;
}
