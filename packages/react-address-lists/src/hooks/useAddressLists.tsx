import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { AddressList } from '../types';

type Config = {
  skip?: boolean;
  env?: Environment;
};

export function useAddressLists<TListConfig extends Record<string, any>>({
  skip = false,
  env = Environment.PROD,
}: Config | undefined = {}) {
  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists`;

  const loginJwt = useLoginJwt();

  const [{ data, loading, error }, sendRequest] = useAxiosGet<
    AddressList<TListConfig>[]
  >({
    url,
    skip,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });

  return [{ data, loading, error }, sendRequest] as const;
}
