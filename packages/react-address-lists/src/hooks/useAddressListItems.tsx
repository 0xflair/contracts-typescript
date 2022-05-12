import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import * as axios from 'axios';

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

  return useAxiosGet<AddressListItem[]>({
    url,
    enabled: Boolean(enabled && loginJwt && listId),
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
