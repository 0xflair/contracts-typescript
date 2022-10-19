import { Provider } from '@ethersproject/providers';
import { PrepareWriteContractConfig } from '@wagmi/core';
import { ContractInterface, Signer } from 'ethers';
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
  prepare?: boolean;
};

export type PredefinedContractWriteConfig<ArgsType extends any[] = any[]> =
  Omit<
    ContractWriteConfig<ArgsType>,
    'args' | 'contractInterface' | 'functionName'
  > & {
    contractAddress?: string;
    prepare?: boolean;
  };

export const useContractWriteAndWait = <ArgsType extends any[] = any[]>({
  contractInterface,
  contractAddress,
  signerOrProvider,
  functionName,
  args,
  confirmations = 1,
  prepare = true,
  ...restOfConfig
}: ContractWriteConfig<ArgsType>) => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const {
    config,
    data: prepareData,
    error: prepareError,
    isError: prepareIsError,
    isLoading: prepareLoading,
  } = usePrepareContractWrite({
    enabled: Boolean(
      prepare &&
        isConnected &&
        address &&
        contractAddress &&
        contractInterface &&
        args !== undefined &&
        functionName,
    ),
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
    data: {
      ...prepareData,
      txResponse: responseData,
      txReceipt: receiptData,
    },
    error: prepareError || responseError || receiptError,
    isIdle: responseIsIdle && receiptIsIdle,
    isPreparing: prepareLoading,
    isLoading: prepareLoading || responseIsLoading || receiptIsLoading,
    isSuccess: responseIsSuccess && receiptIsSuccess,
    isError: prepareIsError || responseIsError || receiptIsError,
    writeAndWait: doWrite ? writeAndWait : undefined,
  } as const;
};
