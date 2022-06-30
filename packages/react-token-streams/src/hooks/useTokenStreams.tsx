import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import { useMemo } from 'react';

import { FLAIR_TOKEN_STREAMS_BACKEND } from '../constants/backend';
import { TokenStream } from '../types/index';

type Config = {
  env?: Environment;
  enabled?: boolean;
};

export function useTokenStreams<TConfig extends Record<string, any>>({
  env = Environment.PROD,
  enabled = true,
}: Config | undefined = {}) {
  const loginJwt = useLoginJwt();
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  const url = `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams`;

  return useAxiosGet<TokenStream<TConfig>[]>({
    url,
    enabled: Boolean(enabled && loginJwt),
    headers,
  });
}
