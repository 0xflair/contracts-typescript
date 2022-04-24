import { Environment, useAxiosPost } from '@0xflair/react-common';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { AddressList } from '../types';

type UpdaterConfig = {
  loginJwt?: string;
  skip?: boolean;
  env?: Environment;
};

export function useAddressListCreator<
  TCollectionConfig extends Record<string, any>
>(
  addressList: Partial<AddressList<TCollectionConfig>>,
  { loginJwt, skip = false, env = Environment.PROD }: UpdaterConfig
) {
  const [{ data, loading, error }, sendRequest] = useAxiosPost<
    AddressList<TCollectionConfig>
  >({
    url: `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists`,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
    data: addressList,
    skip,
  });

  return [{ data, loading, error }, sendRequest] as const;
}
