import { normalizeIpfsUrl } from '@0xflair/ipfs';
import { useAxiosGet } from '@0xflair/react-common';

type Config = {
  uri?: string;
  enabled?: boolean;
};

export function useRemoteJsonReader<TContent = Record<string, any>>({
  uri,
  enabled = true,
}: Config) {
  return useAxiosGet<TContent>({
    url: normalizeIpfsUrl(uri) as string,
    enabled: Boolean(enabled && uri),
    headers: {
      Accept: 'application/json',
    },
  });
}
