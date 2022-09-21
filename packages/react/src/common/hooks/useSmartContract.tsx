import { Environment } from '@flair-sdk/common';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { useInterval } from 'react-use';

import { FLAIR_SMART_CONTRACTS_BACKEND } from '../constants/backend';
import { SmartContract } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
  smartContractId?: string;
  chainId?: number;
  contractAddress?: string;
};

let requestPromise: any = {};

export function useSmartContract<TInitialConfig, TInfo>({
  env = Environment.PROD,
  enabled = true,
  smartContractId,
  chainId,
  contractAddress,
}: Config) {
  const queryClient = useQueryClient();
  const url = smartContractId
    ? `${FLAIR_SMART_CONTRACTS_BACKEND[env]}/v1/smart-contracts/${smartContractId}`
    : `${FLAIR_SMART_CONTRACTS_BACKEND[env]}/v1/smart-contracts/${chainId}/${contractAddress}`;

  const queryKey = [
    { type: 'smart-contract', smartContractId, chainId, contractAddress },
  ];

  const queryFn = async () => {
    if (!requestPromise[url]) {
      requestPromise[url] =
        axios.get<SmartContract<TInitialConfig, TInfo>>(url);
    }

    const response = await requestPromise[url];
    requestPromise[url] = null;

    return response.data;
  };
  const canRequest = Boolean(
    enabled && (smartContractId || (chainId && contractAddress)),
  );

  const result = useQuery<
    SmartContract<TInitialConfig, TInfo>,
    string | Error | null,
    SmartContract<TInitialConfig, TInfo>
  >(queryKey, queryFn, {
    enabled: canRequest,
  });

  useInterval(() => {
    const detectingFeatures =
      !result.data?.features ||
      (result.data.analysisState !== 'succeeded' &&
        result.data.analysisState !== 'failed');

    if (detectingFeatures && canRequest) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, 5000);

  return result;
}
