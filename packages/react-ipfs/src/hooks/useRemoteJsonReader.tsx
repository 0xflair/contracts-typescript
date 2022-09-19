import { normalizeIpfsUrl } from '@flair-sdk/ipfs';
import { useAxiosGet } from '@flair-sdk/react-common';
import { useMemo } from 'react';

type Config = {
  uri?: string;
  enabled?: boolean;
};

export function useRemoteJsonReader<TContent = Record<string, any>>({
  uri,
  enabled = true,
}: Config) {
  const headers = useMemo(() => {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }, []);

  return useAxiosGet<TContent>({
    url: normalizeIpfsUrl(uri) as string,
    enabled: Boolean(enabled && uri),
    headers,
  });
}
