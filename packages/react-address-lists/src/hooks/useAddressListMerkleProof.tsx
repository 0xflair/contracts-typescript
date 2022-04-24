import { Environment, useAxiosGet } from '@0xflair/react-common';
import { BytesLike } from 'ethers';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  treeKey?: string;
  address?: BytesLike;
  skip?: boolean;
  env?: Environment;
};

export function useAddressListMerkleProof({
  env = Environment.PROD,
  treeKey,
  address,
  skip,
}: Config) {
  const url = `${
    FLAIR_ADDRESS_LISTS_BACKEND[env]
  }/v1/address-list-merkle-trees/${treeKey}/proof/${address?.toString()}`;
  const [{ data, loading, error }, sendRequest] = useAxiosGet<BytesLike[]>({
    url,
    skip: skip,
  });

  return [{ data, loading, error }, sendRequest] as const;
}
