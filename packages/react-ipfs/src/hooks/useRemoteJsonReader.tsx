import { useAxiosGet } from '@0xflair/react-common';

import { normalizeIpfsUrl } from '../utils';

type Config = {
  uri?: string;
  enabled?: boolean;
};

export function useRemoteJsonReader<TContent = Record<string, any>>({
  uri,
  enabled,
}: Config) {
  return useAxiosGet<TContent>({
    url: normalizeIpfsUrl(uri) as string,
    enabled: Boolean(enabled && uri),
    headers: {
      Accept: 'application/json',
    },
  });
}
