import '@tanstack/react-query';

import { ZERO_ADDRESS } from '@flair-sdk/common';
import {
  ContractReference,
  findContractByReference,
} from '@flair-sdk/registry';
import { ReadContractConfig as ReadContractConfigWagmi } from '@wagmi/core';
import { ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useContractRead as useContractReadWagmi, useProvider } from 'wagmi';

export type ReadContractConfig<ArgsType = []> = Partial<
  Omit<ReadContractConfigWagmi, 'address' | 'args'>
> & {
  contractReference?: ContractReference;
  args?: ArgsType;
  enabled?: boolean;
  watch?: boolean;
  cacheOnBlock?: boolean;
  cacheTime?: number;
  staleTime?: number;
  contractAddress?: string;
};

export type PredefinedReadContractConfig<ArgsType extends any[] = []> = Omit<
  ReadContractConfig<ArgsType>,
  'contractReference' | 'abi' | 'functionName' | 'address'
> & {
  contractAddress?: string;
};

export const useContractRead = <ResultType = any, ArgsType extends any[] = []>({
  enabled = true,
  contractReference,
  abi,
  contractAddress,
  functionName,
  args,
  watch = false,
  cacheOnBlock,
  ...restOfConfig
}: ReadContractConfig<ArgsType>) => {
  const finalAddress = contractAddress;
  const contractDefinition = useMemo(() => {
    try {
      return contractReference
        ? findContractByReference(contractReference)
        : undefined;
    } catch (e) {
      console.warn(
        `Failed to find contract definition for ${contractReference}`,
      );
      return undefined;
    }
  }, [contractReference]);

  const readyToRead = Boolean(
    enabled && finalAddress && finalAddress !== ZERO_ADDRESS,
  );

  const finalContractInterface = useMemo(
    () =>
      (contractDefinition?.artifact?.abi as any) ||
      abi || [
        `function ${
          functionName?.endsWith(')') ? functionName : `${functionName}()`
        } view`,
      ],
    [abi, contractDefinition?.artifact?.abi, functionName],
  );

  const result = useContractReadWagmi({
    abi: finalContractInterface,
    address: finalAddress,
    functionName,
    args,
    enabled: readyToRead,
    watch,
    cacheOnBlock,
    ...restOfConfig,
  });

  const provider = useProvider({
    chainId: restOfConfig.chainId,
  });
  const contract = useMemo(() => {
    if (!finalAddress || !provider) {
      return;
    }
    return new ethers.Contract(finalAddress, finalContractInterface, provider);
  }, [finalAddress, finalContractInterface, provider]);

  const call = useCallback(
    async (overrides?: { args?: ArgsType }) => {
      if (!contract || !functionName) {
        return;
      }

      const finalArgs = overrides?.args ?? args;

      const result = await contract.functions[functionName](
        ...(Array.isArray(finalArgs)
          ? finalArgs
          : finalArgs
          ? [finalArgs]
          : []),
      );

      if (Array.isArray(result) && result.length === 1) {
        return result[0] as ResultType;
      }

      return result as ResultType;
    },
    [args, contract, functionName],
  );

  return {
    ...result,
    call,
    data: result.data as ResultType | undefined,
  } as const;
};
