import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { AddressList } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
};

export function useAddressLists<TListConfig extends Record<string, any>>({
  env = Environment.PROD,
  enabled = true,
}: Config | undefined = {}) {
  const loginJwt = useLoginJwt();
  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists`;

  return useAxiosGet<AddressList<TListConfig>[]>({
    url,
    enabled: Boolean(enabled && loginJwt),
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
