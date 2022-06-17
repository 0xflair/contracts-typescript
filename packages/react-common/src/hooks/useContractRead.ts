import { ZERO_ADDRESS } from '@0xflair/common';
import {
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@0xflair/contracts-registry';
import { ReadContractConfig as ReadContractConfigWagmi } from '@wagmi/core';
import { useMemo } from 'react';
import { useContractRead as useContractReadWagmi } from 'wagmi';
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
  contractVersion,
  enabled = true,
  contractFqn,
  contractAddress,
  functionName,
  args,
  watch = false,
  cacheOnBlock,
  ...restOfConfig
}: ReadContractConfig<ArgsType>) => {
  const contract = useMemo(
    () => loadContract(contractFqn, contractVersion),
    [contractFqn, contractVersion]
  );
  const readyToRead = Boolean(
    enabled && contractAddress && contractAddress !== ZERO_ADDRESS
  );

  const result = useContractReadWagmi(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
    },
    functionName as string,
    {
      args,
      enabled: readyToRead,
      watch,
      cacheOnBlock,
      ...restOfConfig,
    }
  );

  return {
    ...result,
    data: result.data as ResultType | undefined,
  } as const;
};
