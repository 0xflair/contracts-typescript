import { Environment } from '@flair-sdk/common';

import { useAxiosGet } from '../../../common';
import { FLAIR_DIAMONDS_BACKEND } from '../constants';
import { Diamond } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
  diamondId?: string;
  chainId?: number;
  contractAddress?: string;
};

export function useDiamond({
  env = Environment.PROD,
  enabled = true,
  diamondId,
  chainId,
  contractAddress,
}: Config) {
  const url = diamondId
    ? `${FLAIR_DIAMONDS_BACKEND[env]}/v1/diamonds/${diamondId}`
    : `${FLAIR_DIAMONDS_BACKEND[env]}/v1/diamonds/${chainId}/${contractAddress}`;

  return useAxiosGet<Diamond>({
    url,
    enabled: Boolean(enabled && (diamondId || (chainId && contractAddress))),
  });
}
