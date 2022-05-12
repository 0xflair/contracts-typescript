import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import * as axios from 'axios';
import { BytesLike } from 'ethers';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  env?: Environment;
  enabled?: boolean;
  treeKey?: string;
  listId?: string;
};

export function useAddressListMerkleTreeCreator({
  env = Environment.PROD,
  enabled = false,
  treeKey,
  listId,
}: Config) {
  const loginJwt = useLoginJwt();
  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-list-merkle-trees`;

  return useAxiosPost<BytesLike>({
    url,
    data: {
      treeKey,
      listId,
    },
    enabled: Boolean(enabled && loginJwt && treeKey && listId),
    headers: {
      Authorization: `Bearer ${loginJwt}`,
    },
  });
}
