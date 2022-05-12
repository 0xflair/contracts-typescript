import { Environment, useAxiosPost } from '@0xflair/react-common';
import * as axios from 'axios';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { AddressList } from '../types';

type UpdaterConfig = {
  env?: Environment;
  enabled?: boolean;
  loginJwt?: string;
};

export function useAddressListCreator<
  TCollectionConfig extends Record<string, any>
>(
  addressList: Partial<AddressList<TCollectionConfig>>,
  { loginJwt, enabled = false, env = Environment.PROD }: UpdaterConfig
) {
  return useAxiosPost<AddressList<TCollectionConfig>>({
    url: `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists`,
    data: addressList,
    enabled: Boolean(loginJwt && enabled && addressList),
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
