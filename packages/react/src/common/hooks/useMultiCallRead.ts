import { ContractCall } from '@flair-sdk/registry';
import { ReadContractConfig } from '@wagmi/core';
import { utils } from 'ethers';
import { useMemo, useState } from 'react';
import { useContractRead, useNetwork } from 'wagmi';

type Config = Omit<
  ReadContractConfig,
  'args' | 'functionName' | 'contractInterface'
> & {
  contractInterface?: utils.Interface;
  calls?: ContractCall[];
  enabled?: boolean;
};

export const useMultiCallRead = <TData extends any[]>({
  calls,
  enabled,
  contractInterface,
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

        const iface =
          contractInterface ||
          new utils.Interface([`function ${call.function}`]);

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
  }, [calls, contractInterface]);

  const result = useContractRead({
    contractInterface: [
      'function multicall(bytes[] calldata data) external view returns (bytes[] memory results)',
    ],
    functionName: 'multicall',
    enabled: Boolean(enabled && restOfConfig.addressOrName),
    args: [callDataList],
    cacheTime: 10,
    staleTime: 3,
    onSettled(data, error) {
      if (!data || !contractInterface || !calls || error) {
        setError(error || new Error(`No data or contract interface or calls`));
        return;
      }

      const resultData = data.map((result, index) => {
        const call = calls[index];
        if (!call) {
          throw new Error(`Call not found for result ${index}`);
        }

        const iface =
          contractInterface ||
          new utils.Interface([`function ${call.function}`]);

        if (!call.function || !iface.functions[call.function]) {
          throw new Error(
            `Function ${call.function} not found OR ambiguous in contract ${
              call.contract
            }, choose one of: ${Object.keys(iface.functions).join(' ')}`,
          );
        }

        try {
          const decodedResult = iface.decodeFunctionResult(
            call.function,
            result,
          );

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
    },
    ...restOfConfig,
  });

  return {
    ...result,
    error,
    data: resultData,
  };
};
