import 'axios';

import { Environment, useAxiosGet } from '@0xflair/react-common';
import { useMemo } from 'react';

import { FLAIR_NFT_TOKENS_BACKEND } from '../constants';
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
  const url = `${FLAIR_NFT_TOKENS_BACKEND[env]}/v1/nft-tokens`;

  const params = useMemo(() => {
    return {
      chainId,
      collectionAddress,
      walletAddress,
    };
  }, [chainId, collectionAddress, walletAddress]);

  return useAxiosGet<NftToken[]>({
    url,
    params,
    enabled: enabled,
    headers: {
      'X-Flair-Client-Id': clientId,
    },
  });
};
