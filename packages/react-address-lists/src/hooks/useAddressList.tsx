import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import * as axios from 'axios';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { AddressList } from '../types';

type Config = {
  listId?: string;
  skip?: boolean;
  env?: Environment;
};

export function useAddressList<TListConfig extends Record<string, any>>({
  listId,
  env = Environment.PROD,
}: Config) {
  const loginJwt = useLoginJwt();

  const getUrl = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists/${listId}`;
  const [{ data, loading, error }, sendRequest] = useAxiosGet<
    AddressList<TListConfig>
  >({
    url: getUrl,
    skip: false,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });

  return [{ data, loading, error }, { sendRequest }] as const;
}
