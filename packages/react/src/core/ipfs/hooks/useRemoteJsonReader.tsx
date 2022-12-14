import { normalizeIpfsUrl } from '@flair-sdk/ipfs';
import { useMemo } from 'react';

import { useAxiosGet } from '../../../common';

type Config = {
  uri?: string;
  enabled?: boolean;
  preferDedicatedGateway?: boolean;
};

export function useRemoteJsonReader<TContent = Record<string, any>>({
  uri,
  enabled = true,
  preferDedicatedGateway = false,
}: Config) {
  const headers = useMemo(() => {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }, []);

  return useAxiosGet<TContent>({
    url: normalizeIpfsUrl(uri, preferDedicatedGateway) as string,
    enabled: Boolean(enabled && uri),
    headers,
  });
}
