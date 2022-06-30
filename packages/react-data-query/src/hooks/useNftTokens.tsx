import 'axios';

import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useMemo } from 'react';

import { FLAIR_DATA_QUERY_BACKEND } from '../constants';
import { NftToken } from '../types';

type Props = {
  env?: Environment;
  clientId?: string;
  chainId?: number;
  collectionAddress?: string;
  walletAddress?: string;
  enabled?: boolean;
};

export const useNftTokens = ({
  env = Environment.PROD,
  clientId = 'none',
  chainId,
  collectionAddress,
  walletAddress,
  enabled = true,
}: Props) => {
  const url = `${FLAIR_DATA_QUERY_BACKEND[env]}/v1/data-query/nft-tokens`;

  const params = useMemo(() => {
    return {
      chainId,
      collectionAddress,
      walletAddress,
    };
  }, [chainId, collectionAddress, walletAddress]);

  const headers = useMemo(() => {
    return {
      'X-Flair-Client-Id': clientId,
    };
  }, [clientId]);

  return useAxiosGet<NftToken[]>({
    url,
    params,
    enabled,
    headers,
  });
};
