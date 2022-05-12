import { Environment, useAxiosGet } from '@0xflair/react-common';
import * as axios from 'axios';
import { BytesLike } from 'ethers';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  env?: Environment;
  enabled?: boolean;
  treeKey?: string;
  address?: BytesLike;
};

export function useAddressListMerkleProof({
  env = Environment.PROD,
  enabled = true,
  treeKey,
  address,
}: Config) {
  const url = `${
    FLAIR_ADDRESS_LISTS_BACKEND[env]
  }/v1/address-list-merkle-trees/${treeKey}/proof/${address?.toString()}`;

  return useAxiosGet<BytesLike[]>({
    url,
    enabled: Boolean(enabled && treeKey && address),
  });
}
