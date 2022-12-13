import 'axios';

import { Environment } from '@flair-sdk/common';
import { useMemo } from 'react';

import { useAxiosGet } from '../../../common';
import { FLAIR_DATA_QUERY_BACKEND } from '../constants';
import { NftToken } from '../types';

type Props = {
  env?: Environment;
  clientId?: string;
  chainId?: number;
  contractAddress?: string;
  enabled?: boolean;
};

export const useNftTokensByCollection = ({
  env = Environment.PROD,
  clientId = 'none',
  chainId,
  contractAddress,
  enabled = true,
}: Props) => {
  const url = `${FLAIR_DATA_QUERY_BACKEND[env]}/v1/data-query/nft-tokens/by-collection`;

  const params = useMemo(() => {
    return {
      chainId,
      contractAddress,
    };
  }, [chainId, contractAddress]);

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
