import 'axios';

import { useMemo } from 'react';

import { Environment } from '@flair-sdk/common';

import { useAxiosGet } from '../../../common';
import { FLAIR_DATA_QUERY_BACKEND } from '../constants';
import { NftToken } from '../types';

type Props = {
  env?: Environment;
  clientId?: string;
  chainId?: number;
  contractAddress?: string;
  walletAddress?: string;
  enabled?: boolean;
};

export const useNftTokensByWallet = ({
  env = Environment.PROD,
  clientId = 'none',
  chainId,
  contractAddress,
  walletAddress,
  enabled = true,
}: Props) => {
  const url = `${FLAIR_DATA_QUERY_BACKEND[env]}/v1/data-query/nft-tokens/by-wallet`;

  const params = useMemo(() => {
    return {
      chainId,
      contractAddress,
      walletAddress,
    };
  }, [chainId, contractAddress, walletAddress]);

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
