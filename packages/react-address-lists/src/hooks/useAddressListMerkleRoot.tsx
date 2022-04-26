import { Environment, useAxiosGet } from '@0xflair/react-common';
import { BytesLike } from 'ethers';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  env?: Environment;
  enabled?: boolean;
  treeKey?: string;
  address?: string;
};

export function useAddressListMerkleRoot({
  env = Environment.PROD,
  enabled = true,
  treeKey,
}: Config) {
  const url = `${FLAIR_ADDRESS_LISTS_BACKEND[env]}/v1/address-list-merkle-trees/${treeKey}/root`;
  return useAxiosGet<BytesLike[]>({
    url,
    enabled: Boolean(enabled && treeKey),
  });
}
