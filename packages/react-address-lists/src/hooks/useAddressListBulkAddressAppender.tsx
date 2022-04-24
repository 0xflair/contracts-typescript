import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  listId?: string;
  addresses?: string[];
  skip?: boolean;
  env?: Environment;
};

export function useAddressListBulkAddressAppender({
  listId,
  addresses,
  env = Environment.PROD,
}: Config) {
  const loginJwt = useLoginJwt();

  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists/${listId}/items`;
  const [{ data, loading, error }, sendRequest] = useAxiosPost({
    url,
    data: { addresses },
    skip: true,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });

  return [{ data, loading, error }, sendRequest] as const;
}
