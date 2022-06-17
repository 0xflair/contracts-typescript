import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import * as axios from 'axios';
import { useMemo } from 'react';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { AddressListItem } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
  listId?: string;
};

export function useAddressListItems({
  env = Environment.PROD,
  enabled = true,
  listId,
}: Config) {
  const loginJwt = useLoginJwt();
  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists/${listId}/items`;

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  return useAxiosGet<AddressListItem[]>({
    url,
    enabled: Boolean(enabled && loginJwt && listId),
    headers,
  });
}
