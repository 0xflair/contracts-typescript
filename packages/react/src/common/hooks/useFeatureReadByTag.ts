import '@tanstack/react-query';

import { Environment } from '@flair-sdk/common';
import { ReadContractConfig } from '@wagmi/core';

import { useFeatureRead } from './useFeatureRead';
import { useFunctionFeature } from './useFunctionFeature';

export type FeatureReadByTagConfig<ArgsType = any> =
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
}: FeatureReadByTagConfig<ArgsType>) => {
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
