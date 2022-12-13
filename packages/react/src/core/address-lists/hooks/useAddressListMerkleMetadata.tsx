import { Environment } from '@flair-sdk/common';
import * as axios from 'axios';
import { BytesLike } from 'ethers';
import { useCallback } from 'react';

import { useAxiosGet } from '../../../common';
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
  }/v1/address-list-merkle-trees/${rootHash?.toString()}/metadata/${address
    ?.toString()
    .toLowerCase()}`;

  const hook = useAxiosGet<{ maxAllowance: number }>({
    url,
    enabled: Boolean(enabled && rootHash && address),
  });

  const refetch = useCallback(
    async (overrides?: { rootHash?: BytesLike; address?: BytesLike }) => {
      const response = await hook.sendRequest({
        url: `${
          FLAIR_ADDRESS_LISTS_BACKEND[env]
        }/v1/address-list-merkle-trees/${
          overrides?.rootHash?.toString() || rootHash?.toString()
        }/metadata/${
          overrides?.address?.toString().toLowerCase() ||
          address?.toString().toLowerCase()
        }`,
      });

      return response?.data;
    },
    [address, env, hook, rootHash],
  );

  return { ...hook, refetch } as const;
}
