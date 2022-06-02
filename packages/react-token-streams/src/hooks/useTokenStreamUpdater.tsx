import { Environment, useAxiosPatch } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_TOKEN_STREAMS_BACKEND } from '../constants';
import { TokenStream } from '../types';

type UpdaterConfig = {
  env?: Environment;
  enabled?: boolean;
};

export function useTokenStreamUpdater<
  TCollectionConfig extends Record<string, any>,
>(
  collection: Partial<TokenStream<TCollectionConfig>>,
  { enabled = true, env = Environment.PROD }: UpdaterConfig,
) {
  const loginJwt = useLoginJwt();

  return useAxiosPatch<TokenStream<TCollectionConfig>>({
    url: `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams/${collection._id}`,
    enabled: Boolean(enabled && loginJwt && collection?._id),
    data: collection,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
