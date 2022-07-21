import { Environment, useAxiosPost } from '@0xflair/react-common';
import * as axios from 'axios';
import { useMemo } from 'react';

import { FLAIR_TOKEN_STREAMS_BACKEND } from '../constants/backend';
import { TokenStream } from '../types/index';

type UpdaterConfig = {
  env?: Environment;
  enabled?: boolean;
  loginJwt?: string;
};

export function useTokenStreamCreator<TConfig extends Record<string, any>>(
  tokenStream: Partial<TokenStream<TConfig>>,
  { loginJwt, enabled = false, env = Environment.PROD }: UpdaterConfig,
) {
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  return useAxiosPost<TokenStream<TConfig>>({
    url: `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams`,
    data: tokenStream,
    enabled: Boolean(loginJwt && enabled && tokenStream),
    headers,
  });
}
