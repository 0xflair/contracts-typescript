import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import * as axios from 'axios';
import { useMemo } from 'react';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  env?: Environment;
  enabled?: boolean;
  listId?: string;
  addresses?: string[];
};

export function useAddressListBulkAddressAppender({
  env = Environment.PROD,
  enabled = false,
  listId,
  addresses,
}: Config) {
  const loginJwt = useLoginJwt();
  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists/${listId}/items`;

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  return useAxiosPost({
    url,
    data: { addresses },
    enabled: Boolean(enabled && loginJwt && listId && addresses),
    headers,
  });
}
