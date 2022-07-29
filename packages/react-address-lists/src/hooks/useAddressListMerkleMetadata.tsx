import { Environment, useAxiosGet } from '@0xflair/react-common';
import * as axios from 'axios';
import { BytesLike } from 'ethers';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';

type Config = {
  env?: Environment;
  enabled?: boolean;
  rootHash?: BytesLike;
  address?: BytesLike;
};

export function useAddressListMerkleMetadata({
  env = Environment.PROD,
  enabled = true,
  rootHash,
  address,
}: Config) {
  const url = `${
    FLAIR_ADDRESS_LISTS_BACKEND[env]
  }/v1/address-list-merkle-trees/${rootHash?.toString()}/metadata/${address?.toString()}`;

  return useAxiosGet<{ maxAllowance: number }>({
    url,
    enabled: Boolean(enabled && rootHash && address),
  });
}
