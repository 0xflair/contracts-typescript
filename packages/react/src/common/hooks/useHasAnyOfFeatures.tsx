import { Environment } from '@flair-sdk/common';
import { useMemo } from 'react';

import { useSmartContract } from './useSmartContract';

type Config = {
  env?: Environment;
  chainId?: number;
  contractAddress?: any;
  tags?: string[];
};

export function useHasAnyOfFeatures({
  env,
  chainId,
  contractAddress,
  tags,
}: Config) {
  const { data: smartContract, ...rest } = useSmartContract({
    env,
    chainId,
    contractAddress,
  });

  const hasAnyOfFeatures = useMemo(() => {
    const funcFeat = smartContract?.features?.find((f: any) => {
      if (tags?.includes(f.tag)) {
        return true;
      }
      return false;
    });

    if (!funcFeat) {
      return false;
    }

    return Boolean(funcFeat);
  }, [smartContract, tags]);

  return { ...rest, data: hasAnyOfFeatures } as const;
}
