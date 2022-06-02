import { Environment, useAxiosGet } from '@0xflair/react-common';

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
  clientId,
  chainId,
  collectionAddress,
  walletAddress,
  enabled = true,
}: Props) => {
  const url = `${FLAIR_NFT_TOKENS_BACKEND[env]}/v1/nft-tokens`;

  return useAxiosGet<NftToken[]>({
    url,
    params: {
      chainId,
      collectionAddress,
      walletAddress,
    },
    enabled: enabled,
    headers: {
      'X-Flair-Client-Id': clientId,
    },
  });
};
