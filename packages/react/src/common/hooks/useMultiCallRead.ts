import { ContractCall } from '@flair-sdk/registry';
import { ReadContractConfig } from '@wagmi/core';
import { BytesLike, utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useContractRead } from 'wagmi';

type Config = Omit<ReadContractConfig, 'args' | 'functionName' | 'address'> & {
  address?: string;
  calls?: ContractCall[];
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  cacheOnBlock?: boolean;
};

export const useMultiCallRead = <TData extends any[]>({
  calls,
  enabled,
  abi,
  ...restOfConfig
}: Config) => {
  const [error, setError] = useState<Error>();
  const [resultData, setResultData] = useState<TData>();

  const callDataList = useMemo(() => {
    return (calls
      ?.map((call) => {
        if (!call.function) {
          console.error(
            new Error(`Function is not passed for call ${call.id}`),
          );
          return undefined;
        }
        if (!call.args) {
          console.error(new Error(`Args are not passed for call ${call.id}`));
          return undefined;
        }

        const iface = new utils.Interface(
          (abi as any) || [`function ${call.function}`],
        );

        if (!iface.functions[call.function]) {
          throw new Error(
            `Function ${call.function} not found OR ambiguous in contract ${
              call.contract
            }, choose one of: ${Object.keys(iface.functions).join(' ')}`,
          );
        }

        try {
          return iface.encodeFunctionData(call.function, call.args);
        } catch (err) {
          debugger;
          console.error(
            `Could not encode function ${call.function} with args ${call.args}`,
            err,
          );
        }
      })
      .filter((callData) => !!callData) || []) as string[];
  }, [calls, abi]);

  const result = useContractRead<any, any, BytesLike[]>({
    abi: [
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'multicall',
    enabled: Boolean(enabled && restOfConfig.address),
    args: [callDataList as any],
    cacheTime: 0,
    staleTime: 0,
    cacheOnBlock: false,
    ...restOfConfig,
  });

  useEffect(() => {
    if (!result.data || !calls) {
      return;
    } else if (result.error) {
      setError(result.error);
      return;
    }

    const resultData = result.data.map((result, index) => {
      const call = calls[index];
      if (!call) {
        throw new Error(`Call not found for result ${index}`);
      }

      const iface = new utils.Interface(
        abi ? (abi as any) : [`function ${call.function}`],
      );

      if (!call.function || !iface.functions[call.function]) {
        throw new Error(
          `Function ${call.function} not found OR ambiguous in contract ${
            call.contract
          }, choose one of: ${Object.keys(iface.functions).join(' ')}`,
        );
      }

      try {
        const decodedResult = iface.decodeFunctionResult(call.function, result);

        if (Array.isArray(decodedResult) && decodedResult.length === 1) {
          return decodedResult[0];
        } else {
          return decodedResult;
        }
      } catch (err) {
        debugger;
        console.error(
          `Could not decode function ${call.function} with result ${result}`,
          err,
        );
      }
    }) as TData;

    setError(undefined);
    setResultData(resultData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  return {
    ...result,
    error: error || (result.status === 'error' && result.error),
    data: resultData,
  };
};
