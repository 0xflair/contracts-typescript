import { Environment } from '@0xflair/common';
import { ContractInterface } from 'ethers';
import { useMemo } from 'react';

import { FeatureFunction, FeatureType } from '../types';
import { useSmartContract } from './useSmartContract';

type Config = {
  env?: Environment;
  chainId?: number;
  contractAddress?: any;
  tag?: string;
};

export function useFunctionFeature({
  env,
  chainId,
  contractAddress,
  tag,
}: Config) {
  const { data: smartContract, ...rest } = useSmartContract({
    env,
    chainId,
    contractAddress,
  });

  const feature = useMemo(() => {
    if (!smartContract?.features || !tag) return undefined;

    const func = smartContract.features.find((f) => {
      if (f.type === FeatureType.Function) {
        if (f.tag === tag) {
          return true;
        }
      }
      return false;
    });

    if (!func) {
      console.warn(
        new Error(
          `Function with tag ${tag} is not supported by contract ${contractAddress}`
        )
      );

      return undefined;
    }

    return func as FeatureFunction;
  }, [contractAddress, smartContract, tag]);

  return { ...rest, data: feature } as const;
}
