import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_TOKEN_STREAMS_BACKEND } from '../constants';
import { TokenStream } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
};

export function useTokenStreams<TConfig extends Record<string, any>>({
  env = Environment.PROD,
  enabled = true,
}: Config | undefined = {}) {
  const loginJwt = useLoginJwt();
  const url = `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams`;

  return useAxiosGet<TokenStream<TConfig>[]>({
    url,
    enabled: Boolean(enabled && loginJwt),
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
