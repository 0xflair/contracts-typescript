import { Provider } from '@ethersproject/providers';
import { PrepareWriteContractConfig } from '@wagmi/core';
import { ContractInterface, Signer } from 'ethers';
import { useCallback } from 'react';
import {
  useAccount,
  useConnect,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';

import { useWaitForTransaction } from './useWaitForTransaction';

export type ContractWriteConfig<ArgsType extends any[]> = Omit<
  PrepareWriteContractConfig,
  | 'addressOrName'
  | 'addressOrName'
  | 'contractInterface'
  | 'functionName'
  | 'args'
> & {
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
  confirmations = 1,
  ...restOfConfig
}: ContractWriteConfig<ArgsType>) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const { config, data } = usePrepareContractWrite({
    addressOrName: contractAddress as string,
    contractInterface,
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
    writeAsync: doWrite,
  } = useContractWrite(config);

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

      const receipt = await response?.wait(1);

      return { response, receipt };
    },
    [args, contractAddress, doWrite, functionName, restOfConfig.overrides],
  );

  return {
    data: {
      ...data,
      txResponse: responseData,
      txReceipt: receiptData,
    },
    error: responseError || receiptError,
    isIdle: responseIsIdle && receiptIsIdle,
    isLoading: responseIsLoading || receiptIsLoading,
    isSuccess: responseIsSuccess && receiptIsSuccess,
    isError: responseIsError || receiptIsError,
    writeAndWait: doWrite ? writeAndWait : undefined,
  } as const;
};
