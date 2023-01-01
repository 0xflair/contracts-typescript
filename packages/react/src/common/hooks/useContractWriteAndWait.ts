import { PrepareWriteContractConfig } from '@wagmi/core';
import { useCallback } from 'react';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';

import { useWaitForTransaction } from './useWaitForTransaction';

export type ContractWriteConfig<ArgsType extends any[]> = Omit<
  PrepareWriteContractConfig,
  'address' | 'args'
> & {
  contractAddress?: string;
  args?: ArgsType;
  confirmations?: number;
  prepare?: boolean;
};

export type PredefinedContractWriteConfig<ArgsType extends any[] = any[]> =
  Omit<
    ContractWriteConfig<ArgsType>,
    'address' | 'args' | 'abi' | 'functionName'
  > & {
    contractAddress?: string;
    prepare?: boolean;
  };

export const useContractWriteAndWait = <ArgsType extends any[] = any[]>({
  abi,
  contractAddress,
  functionName,
  args,
  confirmations = 1,
  prepare = true,
  ...restOfConfig
}: ContractWriteConfig<ArgsType>) => {
  const { address: account, isConnected } = useAccount();
  const { chain } = useNetwork();

  const shouldPrepare = Boolean(
    prepare &&
      isConnected &&
      account &&
      contractAddress &&
      abi &&
      args !== undefined &&
      functionName,
  );

  const {
    config,
    data: prepareData,
    error: prepareError,
    isError: prepareIsError,
    isLoading: prepareLoading,
  } = usePrepareContractWrite({
    enabled: shouldPrepare,
    address: contractAddress,
    abi,
    functionName,
    args,
    ...restOfConfig,
  });

  const {
    data: responseData,
    error: responseError,
    isIdle: responseIsIdle,
    isLoading: responseIsLoading,
    isSuccess: responseIsSuccess,
    isError: responseIsError,
    status: responseStatus,
    writeAsync: doWrite,
  } = useContractWrite(config);

  const {
    data: receiptData,
    error: receiptError,
    isIdle: receiptIsIdle,
    isLoading: receiptIsLoading,
    isSuccess: receiptIsSuccess,
    isError: receiptIsError,
    fetchStatus: receiptFetchStatus,
  } = useWaitForTransaction({
    hash: responseData?.hash,
    confirmations,
    enabled: Boolean(isConnected && chain),
  });

  const writeAndWait = useCallback(
    async (
      inputArgs?: ArgsType,
      overrides?: Partial<PrepareWriteContractConfig['overrides']>,
    ) => {
      if (inputArgs && inputArgs instanceof Event) {
        throw new Error(
          `Failed to call ${functionName} on ${contractAddress}, writeAndWait is called with wrong "args", it must be an array. Did you forget to call like this "onClick={() => writeAndWait()}"?`,
        );
      }

      const response = await doWrite?.(
        inputArgs || overrides
          ? {
              recklesslySetUnpreparedArgs: inputArgs || args,
              ...(overrides
                ? {
                    recklesslySetUnpreparedOverrides: {
                      ...(restOfConfig.overrides || {}),
                      ...overrides,
                    },
                  }
                : {}),
            }
          : undefined,
      );

      const receipt = await response?.wait(confirmations);

      return { response, receipt };
    },
    [
      args,
      confirmations,
      contractAddress,
      doWrite,
      functionName,
      restOfConfig.overrides,
    ],
  );

  return {
    config,
    data: {
      ...prepareData,
      txResponse: responseData,
      txReceipt: receiptData,
    },
    error:
      shouldPrepare && prepareError
        ? prepareError
        : responseError || receiptError,
    isIdle: responseIsIdle && receiptIsIdle,
    isPreparing: prepareLoading,
    isLoading:
      responseIsLoading ||
      responseStatus === 'loading' ||
      receiptIsLoading ||
      receiptFetchStatus === 'fetching',
    isSuccess: responseIsSuccess && receiptIsSuccess,
    isError: prepareIsError || responseIsError || receiptIsError,
    writeAndWait: doWrite && !prepareLoading ? writeAndWait : undefined,
  } as const;
};
