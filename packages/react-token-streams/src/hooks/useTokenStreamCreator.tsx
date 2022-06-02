import { Environment, useAxiosPost } from '@0xflair/react-common';
import * as axios from 'axios';

import { FLAIR_TOKEN_STREAMS_BACKEND } from '../constants';
import { TokenStream } from '../types';

type UpdaterConfig = {
  env?: Environment;
  enabled?: boolean;
  loginJwt?: string;
};

export function useTokenStreamCreator<TConfig extends Record<string, any>>(
  tokenStream: Partial<TokenStream<TConfig>>,
  { loginJwt, enabled = false, env = Environment.PROD }: UpdaterConfig,
) {
  return useAxiosPost<TokenStream<TConfig>>({
    url: `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams`,
    data: tokenStream,
    enabled: Boolean(loginJwt && enabled && tokenStream),
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
