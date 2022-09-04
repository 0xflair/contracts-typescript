import { SafeConnector } from '@0xflair/common';
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from 'react-use';
import {
  useConnect,
  useWaitForTransaction as useWaitForTransactionWagmi,
} from 'wagmi';
import {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
} from 'wagmi/dist/declarations/src/hooks/transactions/useWaitForTransaction';

export const useWaitForTransaction = ({
  enabled = true,
  ...config
}: UseWaitForTransactionArgs & UseWaitForTransactionConfig) => {
  const { connectors, activeConnector } = useConnect();
  const [actualHash, setActualHash] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const gnosisSafeConnector = connectors.find(({ id }) => id === 'safe') as
    | SafeConnector
    | undefined;

  const result = useWaitForTransactionWagmi({
    ...config,
    hash: actualHash,
  });

  const checkSafeTransaction = useCallback(async () => {
    setIsLoading(true);

    if (!config?.hash) {
      setIsLoading(false);
      return;
    }

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
  }, [activeConnector?.id, config?.hash, gnosisSafeConnector]);

  useEffect(() => {
    checkSafeTransaction();
  }, [checkSafeTransaction]);

  useInterval(
    checkSafeTransaction,
    enabled && config?.hash && !actualHash ? 2000 : null,
  );

  return { ...result, isLoading: result.isLoading || isLoading } as const;
};
