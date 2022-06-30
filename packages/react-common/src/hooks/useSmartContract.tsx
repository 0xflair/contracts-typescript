import { Environment } from '@0xflair/common';
import { useInterval } from 'react-use';

import { FLAIR_SMART_CONTRACTS_BACKEND } from '../constants/backend';
import { SmartContract } from '../types';
import { useAxiosGet } from './useAxiosGet';

type Config = {
  env?: Environment;
  enabled?: boolean;
  smartContractId?: string;
  chainId?: number;
  contractAddress?: string;
};

const globalSmartContractObjectsCache = new Map<string, SmartContract>();

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

  const canRequest = Boolean(
    !globalSmartContractObjectsCache.has(url) &&
      enabled &&
      (smartContractId || (chainId && contractAddress))
  );

  const result = useAxiosGet<SmartContract>({
    url,
    enabled: canRequest,
  });

  let data: SmartContract | undefined | null = result.data
    ? result.data
    : undefined;

  if (globalSmartContractObjectsCache.has(url)) {
    data = globalSmartContractObjectsCache.get(url);
  } else if (data && !result.error && !result.isLoading) {
    globalSmartContractObjectsCache.set(url, data);
  }

  const detectingFeatures =
    !data?.features ||
    (data.analysisState !== 'succeeded' && data.analysisState !== 'failed');

  if (detectingFeatures) {
    globalSmartContractObjectsCache.delete(url);
  }

  useInterval(() => {
    if (detectingFeatures && canRequest) {
      result.sendRequest().then(() => {
        globalSmartContractObjectsCache.delete(url);
      });
    }
  }, 6000);

  return {
    ...result,
    data,
  } as const;
}
