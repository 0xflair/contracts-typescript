import { Provider } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { PrepareWriteContractConfig } from '@wagmi/core';
import { Signer } from 'ethers';

import { useFeatureWrite } from './useFeatureWrite';
import { useFunctionFeature } from './useFunctionFeature';

export type FeatureWriteByTagConfig<ArgsType extends Record<string, any>> =
  Partial<PrepareWriteContractConfig> & {
    env?: Environment;
    chainId?: number;
    enabled?: boolean;
    contractAddress?: string;
    signerOrProvider?: Signer | Provider | null;
    tag?: string;
    args?: ArgsType;
    confirmations?: number;
  };

export const useFeatureWriteByTag = <ArgsType extends Record<string, any>>({
  env,
  chainId,
  contractAddress,
  tag,
  ...rest
}: FeatureWriteByTagConfig<ArgsType>) => {
  const { data: feature } = useFunctionFeature({
    env,
    chainId,
    contractAddress,
    tag,
  });

  const result = useFeatureWrite<ArgsType>({
    contractAddress,
    feature,
    ...rest,
  });

  return {
    ...result,
    feature,
    isSupported: Boolean(feature),
  } as const;
};
