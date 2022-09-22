import 'react-query';

import { ZERO_ADDRESS } from '@flair-sdk/common';
import {
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@flair-sdk/registry';
import { ReadContractConfig as ReadContractConfigWagmi } from '@wagmi/core';
import { ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useContractRead as useContractReadWagmi, useProvider } from 'wagmi';
import { UseContractReadConfig } from 'wagmi/dist/declarations/src/hooks/contracts/useContractRead';

export type ReadContractConfig<ArgsType = []> = Partial<
  Omit<ReadContractConfigWagmi, 'args'>
> &
  UseContractReadConfig & {
    contractVersion?: ContractVersion;
    contractFqn: ContractFqn;
    contractAddress?: string;
    functionName: string;
    args?: ArgsType;
    watch?: boolean;
    cacheOnBlock?: boolean;
  };

export type PredefinedReadContractConfig<ArgsType = []> = Omit<
  ReadContractConfig<ArgsType>,
  'contractFqn' | 'functionName'
>;

export const useContractRead = <ResultType = any, ArgsType = []>({
  contractVersion = 'v1',
  enabled = true,
  contractFqn,
  contractAddress,
  functionName,
  args,
  watch = false,
  cacheOnBlock,
  ...restOfConfig
}: ReadContractConfig<ArgsType>) => {
  const contractDefinition = useMemo(
    () => loadContract(contractFqn, contractVersion),
    [contractFqn, contractVersion],
  );
  const readyToRead = Boolean(
    enabled && contractAddress && contractAddress !== ZERO_ADDRESS,
  );

  const result = useContractReadWagmi(
    {
      addressOrName: contractAddress as string,
      contractInterface: contractDefinition?.artifact.abi || [],
    },
    functionName as string,
    {
      args,
      enabled: readyToRead,
      watch,
      cacheOnBlock,
      ...restOfConfig,
    },
  );

  const provider = useProvider({
    chainId: restOfConfig.chainId,
  });
  const contract = useMemo(() => {
    if (!contractAddress || !provider || !contractDefinition?.artifact.abi) {
      return;
    }

    return new ethers.Contract(
      contractAddress,
      contractDefinition.artifact.abi,
      provider,
    );
  }, [contractAddress, contractDefinition?.artifact.abi, provider]);

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
