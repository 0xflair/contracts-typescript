import { Environment } from '@0xflair/common';
import axios from 'axios';
import { QueryClient, useQuery } from 'react-query';
import { createWebStoragePersister } from 'react-query/createWebStoragePersister';
import { persistQueryClient } from 'react-query/persistQueryClient';
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

const localStoragePersister = createWebStoragePersister({
  storage: window.localStorage,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1_000 * 60 * 60 * 24,
      staleTime: 1_000 * 60 * 60 * 2,
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

export function useSmartContract({
  env = Environment.PROD,
  enabled = true,
  smartContractId,
  chainId,
  contractAddress,
}: Config) {
  const url = smartContractId
    ? `${FLAIR_SMART_CONTRACTS_BACKEND[env]}/v1/smart-contracts/${smartContractId}`
    : `${FLAIR_SMART_CONTRACTS_BACKEND[env]}/v1/smart-contracts/${chainId}/${contractAddress}`;

  const queryKey = [
    { type: 'smart-contract', smartContractId, chainId, contractAddress },
  ];
  const queryFn = async () => {
    const response = await axios.get<SmartContract>(url);
    return response.data;
  };
  const canRequest = Boolean(
    enabled && (smartContractId || (chainId && contractAddress)),
  );

  const result = useQuery(queryKey, queryFn, {
    enabled: canRequest,
    onSuccess(data: SmartContract) {
      const detectingFeatures =
        !data?.features ||
        (data.analysisState !== 'succeeded' && data.analysisState !== 'failed');

      if (detectingFeatures) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });

  useInterval(() => {
    const detectingFeatures =
      !result.data?.features ||
      (result.data.analysisState !== 'succeeded' &&
        result.data.analysisState !== 'failed');

    if (detectingFeatures && canRequest) {
      result.refetch();
    }
  }, 5000);

  return result;
}
