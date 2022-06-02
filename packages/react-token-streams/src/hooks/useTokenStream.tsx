import { Environment, useAxiosGet } from '@0xflair/react-common';

import { FLAIR_TOKEN_STREAMS_BACKEND } from '../constants';
import { TokenStream } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
  streamId?: string;
  chainId?: number;
  contractAddress?: string;
};

export function useTokenStream<TConfig extends Record<string, any>>({
  env = Environment.PROD,
  enabled = true,
  streamId,
  chainId,
  contractAddress,
}: Config) {
  const url = streamId
    ? `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams/${streamId}`
    : `${FLAIR_TOKEN_STREAMS_BACKEND[env]}/v1/token-streams/${chainId}/${contractAddress}`;

  return useAxiosGet<TokenStream<TConfig>>({
    url,
    enabled: Boolean(enabled && (streamId || (chainId && contractAddress))),
  });
}
