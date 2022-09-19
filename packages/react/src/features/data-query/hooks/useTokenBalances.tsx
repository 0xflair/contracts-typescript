import 'axios';

import { Environment } from '@flair-sdk/common';
import { useMemo } from 'react';

import { useAxiosGet } from '../../../common';
import { FLAIR_DATA_QUERY_BACKEND } from '../constants';
import { TokenBalance } from '../types';

type Props = {
  env?: Environment;
  clientId?: string;
  chainId?: number;
  address?: string;
  enabled?: boolean;
};

export const useTokenBalances = ({
  env = Environment.PROD,
  clientId = 'none',
  chainId,
  address,
  enabled = true,
}: Props) => {
  const url = `${FLAIR_DATA_QUERY_BACKEND[env]}/v1/data-query/token-balances`;

  const params = useMemo(() => {
    return {
      chainId,
      address,
    };
  }, [chainId, address]);

  const headers = useMemo(() => {
    return {
      'X-Flair-Client-Id': clientId,
    };
  }, [clientId]);

  return useAxiosGet<TokenBalance[]>({
    url,
    params,
    enabled: enabled,
    headers,
  });
};
