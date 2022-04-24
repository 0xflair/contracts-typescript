import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  listId?: string;
  itemIds?: string[];
  skip?: boolean;
  env?: Environment;
};

export function useAddressListBulkItemDeleter({
  listId,
  itemIds,
  env = Environment.PROD,
}: Config) {
  const loginJwt = useLoginJwt();

  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-lists/${listId}/delete-items`;
  const [{ data, loading, error }, sendRequest] = useAxiosPost({
    url,
    data: { itemIds },
    skip: true,
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });

  return [{ data, loading, error }, sendRequest] as const;
}
