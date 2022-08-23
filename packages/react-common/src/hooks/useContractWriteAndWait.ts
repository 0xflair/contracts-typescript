import { Provider } from '@ethersproject/providers';
import { WriteContractConfig } from '@wagmi/core';
import { ContractInterface, Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

export type ContractWriteConfig<ArgsType extends any[]> =
  WriteContractConfig & {
    contractInterface: ContractInterface;
    contractAddress?: string;
    signerOrProvider?: Signer | Provider | null;
    functionName: string;
    args?: ArgsType;
    confirmations?: number;
  };

export const useContractWriteAndWait = <ArgsType extends any[] = any[]>({
  contractInterface,
  contractAddress,
  signerOrProvider,
  functionName,
  args,
  confirmations = 3,
  ...restOfConfig
}: ContractWriteConfig<ArgsType>) => {
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
      contractInterface,
      ...(signerOrProvider ? { signerOrProvider } : {}),
    },
    functionName as string,
    {
      args,
      ...restOfConfig,
    },
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
    confirmations,
  });

  const writeAndWait = useCallback(
    async (
      inputArgs?: ArgsType,
      overrides?: Partial<WriteContractConfig['overrides']>,
    ) => {
      if (inputArgs && inputArgs instanceof Event) {
        throw new Error(
          `Failed to call ${functionName} on ${contractAddress}, writeAndWait is called with wrong "args", it must be an array. Did you forget to call like this "onClick={() => writeAndWait()}"?`,
        );
      }

      const response = await doWrite({
        args: inputArgs || args,
        ...restOfConfig,
        ...(overrides
          ? { overrides: { ...(restOfConfig.overrides || {}), ...overrides } }
          : {}),
      });

      const receipt = await response?.wait(1);

      return { response, receipt };
    },
    [doWrite, args, restOfConfig, functionName, contractAddress],
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
