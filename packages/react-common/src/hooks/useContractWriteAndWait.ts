import {
  ContractKey,
  loadContract,
  Version,
} from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { WriteContractConfig } from '@wagmi/core';
import { Signer } from 'ethers';
import { useCallback } from 'react';
import {
  useContractWrite,
  useProvider,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';

export type ContractWriteConfig<ArgsType extends any[]> =
  WriteContractConfig & {
    version?: Version;
    contractKey: ContractKey;
    contractAddress?: string;
    signerOrProvider?: Signer | Provider | null;
    functionName: string;
    args?: ArgsType;
  };

export const useContractWriteAndWait = <ArgsType extends any[] = any[]>({
  version,
  contractKey,
  contractAddress,
  signerOrProvider,
  functionName,
  args,
  ...restOfConfig
}: ContractWriteConfig<ArgsType>) => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = loadContract(contractKey, version);

  const {
    data: responseData,
    error: responseError,
    isIdle: responseIsIdle,
    isLoading: responseIsLoading,
    isSuccess: responseIsSuccess,
    isError: responseIsError,
    writeAsync: doWrite,
  } = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      ...(signerOrProvider
        ? { signerOrProvider }
        : signer
        ? { signerOrProvider: signer }
        : provider
        ? { signerOrProvider: provider }
        : {}),
    },
    functionName as string,
    {
      args,
      ...restOfConfig,
    }
  );

  const {
    data: receiptData,
    error: receiptError,
    isIdle: receiptIsIdle,
    isLoading: receiptIsLoading,
    isSuccess: receiptIsSuccess,
    isError: receiptIsError,
  } = useWaitForTransaction({
    hash: responseData?.hash,
    confirmations: 2,
  });

  const writeAndWait = useCallback(
    async (inputArgs: ArgsType) => {
      const response = await doWrite({
        args: inputArgs || args,
        ...restOfConfig,
      });

      const receipt = await response?.wait(1);

      return { response, receipt };
    },
    [doWrite, args, restOfConfig]
  );

  return {
    data: {
      txResponse: responseData,
      txReceipt: receiptData,
    },
    error: responseError || receiptError,
    isIdle: responseIsIdle && receiptIsIdle,
    isLoading: responseIsLoading || receiptIsLoading,
    isSuccess: responseIsSuccess && receiptIsSuccess,
    isError: responseIsError || receiptIsError,
    writeAndWait,
  } as const;
};
