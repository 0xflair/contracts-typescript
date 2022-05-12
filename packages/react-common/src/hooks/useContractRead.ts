import { ZERO_ADDRESS } from '@0xflair/common';
import {
  ContractKey,
  loadContract,
  Version,
} from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useContractRead as useContractReadWagmi } from 'wagmi';
import { UseContractReadConfig } from 'wagmi/dist/declarations/src/hooks/contracts/useContractRead';

export type ReadContractConfig<ArgsType extends any[] = any[]> =
  UseContractReadConfig & {
    version?: Version;
    contractKey: ContractKey;
    contractAddress?: string;
    signerOrProvider?: Signer | Provider | null;
    functionName: string;
    args?: ArgsType;
    enabled?: boolean;
    watch?: boolean;
    cacheOnBlock?: boolean;
  };

export const useContractRead = <
  ResultType = any,
  ArgsType extends any[] = any[]
>({
  version,
  enabled = true,
  contractKey,
  contractAddress,
  signerOrProvider,
  functionName,
  args,
  watch = false,
  cacheOnBlock,
  ...restOfConfig
}: ReadContractConfig<ArgsType>) => {
  const contract = loadContract(contractKey, version);
  const readyToRead = Boolean(
    enabled && contractAddress && contractAddress !== ZERO_ADDRESS
  );

  const result = useContractReadWagmi(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      ...(signerOrProvider ? { signerOrProvider } : {}),
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
