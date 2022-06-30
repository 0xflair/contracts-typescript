import { Interface } from 'ethers/lib/utils';
import { useMemo } from 'react';

import { FunctionsRegistry } from '../registries/function-normalizers.registry';
import { FunctionCall } from '../types';

type Config = {
  signature?: string;
  args?: any;
  context?: any;
};

export const normalizeFunctionCall = (
  signature: string,
  args: Record<string, any> = {},
  context?: any
) => {
  const func = FunctionsRegistry.find((f) => f.signature === signature);

  if (!func) {
    if (signature)
      console.warn(
        new Error(`Function ${signature} not found in the registry`)
      );

    return {
      interface: new Interface([]),
      functionName: '',
      args: [],
    };
  }

  return func.normalize(args, context);
};

export function useNormalizedFunctionCall({
  signature = '',
  args = {},
  context,
}: Config): FunctionCall {
  const functionCall = useMemo(() => {
    return normalizeFunctionCall(signature, args, context);
  }, [signature, args, context]);

  return functionCall;
}
