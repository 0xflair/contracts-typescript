import { useAxiosGet } from '@0xflair/react-common';

import { normalizeIpfsUrl } from '../utils';

type Config = {
  uri?: string;
  skip?: boolean;
};

export function useRemoteJsonReader<TContent = Record<string, any>>({
  uri,
  skip,
}: Config) {
  const [{ data, loading, error }, sendRequest] = useAxiosGet<TContent>({
    url: normalizeIpfsUrl(uri) as string,
    skip: skip || !uri,
    headers: {
      Accept: 'application/json',
    },
  });

  return [{ data, loading, error }, sendRequest] as const;
}
