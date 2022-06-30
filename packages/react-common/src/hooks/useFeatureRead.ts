import { ZERO_ADDRESS } from '@0xflair/common';
import { ReadContractConfig } from '@wagmi/core';
import { useContractRead } from 'wagmi';

import { FeatureFunction } from '../types';
import { useNormalizedFunctionCall } from './useNormalizedFunctionCall';

type Config<ArgsType> = Partial<ReadContractConfig> & {
  enabled?: boolean;
  contractAddress?: string;
  feature?: FeatureFunction;
  args?: ArgsType;
};

export const useFeatureRead = <ArgsType>({
  contractAddress,
  feature,
  args,
  enabled = true,
  ...restOfConfig
}: Config<ArgsType>) => {
  const call = useNormalizedFunctionCall({
    signature: feature?.signature,
    args,
  });

  return useContractRead(
    {
      contractInterface: call.interface,
      addressOrName: contractAddress || ZERO_ADDRESS,
    },
    call.functionName,
    {
      args: call.args,
      enabled: Boolean(contractAddress && call.functionName && enabled),
      ...restOfConfig,
    }
  );
};
