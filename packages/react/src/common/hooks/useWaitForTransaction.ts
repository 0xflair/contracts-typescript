import '@ethersproject/abstract-provider';

import { SafeConnector } from '@flair-sdk/common';
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from 'react-use';
import {
  useConnect,
  useWaitForTransaction as useWaitForTransactionWagmi,
} from 'wagmi';
// import {
//   UseWaitForTransactionArgs,
//   UseWaitForTransactionConfig,
// } from 'wagmi/dist/declarations/src/hooks/transactions/useWaitForTransaction';

export const useWaitForTransaction = (
  {
    enabled = true,
    ...config
  }: any /*UseWaitForTransactionArgs & UseWaitForTransactionConfig*/,
) => {
  const { connectors, activeConnector } = useConnect();
  const [actualHash, setActualHash] = useState<string>();
  const [isLoading, setIsLoading] = useState(Boolean(config?.hash));

  const gnosisSafeConnector = connectors.find(({ id }) => id === 'safe') as
    | SafeConnector
    | undefined;

  const resultInput = useWaitForTransactionWagmi({
    ...config,
    hash: config?.hash,
    enabled: Boolean(enabled && !actualHash),
  });

  const resultActual = useWaitForTransactionWagmi({
    ...config,
    hash: actualHash,
  });

  const checkSafeTransaction = useCallback(async () => {
    if (!config?.hash) {
      setIsLoading(false);
      return;
    }

    if (!resultInput.isLoading && resultInput.data?.transactionHash) {
      setActualHash(resultInput.data.transactionHash);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      if (activeConnector?.id == gnosisSafeConnector?.id) {
        if (gnosisSafeConnector?.ready) {
          const actualTx = await gnosisSafeConnector?.getTransactionBySafeHash(
            config?.hash,
          );

          if (actualTx?.txHash) {
            setActualHash(actualTx.txHash);
            setIsLoading(false);
          }
        }
      } else {
        setActualHash(config?.hash);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Could not fetch safe hash: ', error);
    }
  }, [
    activeConnector?.id,
    config?.hash,
    gnosisSafeConnector,
    resultInput.data?.transactionHash,
    resultInput.isLoading,
  ]);

  useEffect(() => {
    checkSafeTransaction();
  }, [checkSafeTransaction]);

  useInterval(
    checkSafeTransaction,
    enabled && config?.hash && !actualHash ? 2000 : null,
  );

  return {
    ...resultActual,
    isLoading: resultActual.isLoading || isLoading,
  } as const;
};
