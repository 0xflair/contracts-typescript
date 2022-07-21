import { Environment, useAxiosPatch } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import { useMemo } from 'react';

import { FLAIR_TOKEN_STREAMS_BACKEND } from '../constants/backend';
import { TokenStream } from '../types/index';

type UpdaterConfig = {
  env?: Environment;
  enabled?: boolean;
};

export function useTokenStreamUpdater<
  TStreamConfig extends Record<string, any>,
>(
  stream: Partial<TokenStream<TStreamConfig>>,
  { enabled = true, env = Environment.PROD }: UpdaterConfig,
) {
  const loginJwt = useLoginJwt();
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  return useAxiosPatch<TokenStream<TStreamConfig>>({
    url: `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams/${stream._id}`,
    enabled: Boolean(enabled && loginJwt && stream?._id),
    data: stream,
    headers,
  });
}
