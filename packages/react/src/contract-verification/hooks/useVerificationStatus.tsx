import { Environment } from '@flair-sdk/common';
import axios from 'axios';
import { useMemo } from 'react';
import { useInterval } from 'react-use';

import { useAxiosGet } from '../../common';
import { useLoginJwt } from '../../wallet';
import { FLAIR_CONTRACT_VERIFICATION_BACKEND } from '../constants';
import { ContractVerification } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
  chainId?: number;
  contractAddress?: string;
};

export function useVerificationStatus({
  env = Environment.PROD,
  enabled = true,
  chainId,
  contractAddress,
}: Config) {
  const url = `${FLAIR_CONTRACT_VERIFICATION_BACKEND[env]}/v1/contract-verifications/${chainId}/${contractAddress}`;

  const loginJwt = useLoginJwt();
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  const { sendRequest, ...rest } = useAxiosGet<ContractVerification>({
    url,
    enabled: Boolean(enabled && chainId && contractAddress),
    headers,
  });

  useInterval(() => {
    sendRequest();
  }, 5000);

  return {
    sendRequest,
    ...rest,
  } as const;
}
