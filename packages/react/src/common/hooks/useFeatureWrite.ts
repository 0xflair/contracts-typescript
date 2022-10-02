import { Provider } from '@ethersproject/providers';
import { PrepareWriteContractConfig } from '@wagmi/core';
import { Signer } from 'ethers';
import { useCallback } from 'react';

import { FeatureFunction } from '../types';
import { useContractWriteAndWait } from './useContractWriteAndWait';
import {
  normalizeFunctionCall,
  useNormalizedFunctionCall,
} from './useNormalizedFunctionCall';

type Config<ArgsType extends Record<string, any>> =
  Partial<PrepareWriteContractConfig> & {
    enabled?: boolean;
    contractAddress?: string;
    signerOrProvider?: Signer | Provider | null;
    feature?: FeatureFunction;
    args?: ArgsType;
    confirmations?: number;
  };

export const useFeatureWrite = <ArgsType extends Record<string, any>>({
  contractAddress,
  signerOrProvider,
  feature,
  args,
  ...restOfConfig
}: Config<ArgsType>) => {
  const call = useNormalizedFunctionCall({
    signature: feature?.signature,
    args,
  });

  const result = useContractWriteAndWait({
    contractInterface: call.interface,
    functionName: call.functionName,
    args: call.args,
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });

  const writeAndWait = useCallback(
    async (
      inputArgs?: ArgsType,
      overrides?: Partial<PrepareWriteContractConfig['overrides']>,
    ) => {
      const call = normalizeFunctionCall(
        feature?.signature || '',
        inputArgs || args,
      );

      return result.writeAndWait?.(call.args, overrides);
    },
    [args, feature?.signature, result],
  );

  return {
    ...result,
    writeAndWait: result.writeAndWait ? writeAndWait : undefined,
  };
};
