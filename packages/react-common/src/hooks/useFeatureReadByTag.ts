import { Environment } from '@0xflair/common';
import { ReadContractConfig } from '@wagmi/core';

import { useFeatureRead } from './useFeatureRead';
import { useFunctionFeature } from './useFunctionFeature';

export type ContractReadByFeatureConfig<ArgsType = any> =
  Partial<ReadContractConfig> & {
    env?: Environment;
    chainId?: number;
    enabled?: boolean;
    contractAddress?: string;
    tag?: string;
    args?: ArgsType;
  };

export const useFeatureReadByTag = <ResultType = any, ArgsType = any>({
  env,
  chainId,
  contractAddress,
  tag,
  ...rest
}: ContractReadByFeatureConfig<ArgsType>) => {
  const { data: feature } = useFunctionFeature({
    env,
    chainId,
    contractAddress,
    tag,
  });

  const { data, ...result } = useFeatureRead<ArgsType>({
    chainId,
    contractAddress,
    feature,
    ...rest,
  });

  return {
    ...result,
    data: data as ResultType | undefined,
    feature,
    isSupported: Boolean(feature),
  } as const;
};
