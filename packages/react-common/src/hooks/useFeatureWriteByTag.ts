import { Environment } from '@0xflair/common';
import { Provider } from '@ethersproject/providers';
import { WriteContractConfig } from '@wagmi/core';
import { Signer } from 'ethers';

import { useFeatureWrite } from './useFeatureWrite';
import { useFunctionFeature } from './useFunctionFeature';

export type ContractWriteByFeatureConfig<ArgsType extends Record<string, any>> =
  Partial<WriteContractConfig> & {
    env?: Environment;
    chainId?: number;
    enabled?: boolean;
    contractAddress?: string;
    signerOrProvider?: Signer | Provider | null;
    tag?: string;
    args?: ArgsType;
  };

export const useFeatureWriteByTag = <ArgsType extends Record<string, any>>({
  env,
  chainId,
  contractAddress,
  tag,
  ...rest
}: ContractWriteByFeatureConfig<ArgsType>) => {
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
