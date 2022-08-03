import { Environment } from '@0xflair/common';
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

export function useSmartContract({
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
    const response = await axios.get<SmartContract>(url);
    return response.data;
  };
  const canRequest = Boolean(
    enabled && (smartContractId || (chainId && contractAddress)),
  );

  const result = useQuery<
    SmartContract<any>,
    string | Error | null,
    SmartContract<any>
  >(queryKey, queryFn, {
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
