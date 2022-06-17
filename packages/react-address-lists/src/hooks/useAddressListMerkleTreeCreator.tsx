import { Environment, useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import * as axios from 'axios';
import { BytesLike } from 'ethers';
import { useMemo } from 'react';

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

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  const data = useMemo(() => {
    return {
      treeKey,
      listId,
    };
  }, [treeKey, listId]);

  return useAxiosPost<BytesLike>({
    url,
    data,
    enabled: Boolean(enabled && loginJwt && treeKey && listId),
    headers,
  });
}
