import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import { BytesLike } from 'ethers';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  treeKey?: string;
  listId?: string;
  skip?: boolean;
  env?: Environment;
};

export function useAddressListMerkleTreeCreator({
  env = Environment.PROD,
  treeKey,
  listId,
  skip = true,
}: Config) {
  const loginJwt = useLoginJwt();

  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-list-merkle-trees`;
  const [{ data, loading, error }, sendRequest] = useAxiosPost<BytesLike>({
    url,
    data: {
      treeKey,
      listId,
    },
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
    skip,
  });

  return [{ data, loading, error }, sendRequest] as const;
}
