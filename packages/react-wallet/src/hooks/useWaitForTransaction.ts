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

import { SafeConnector } from '../connectors/gnosis-safe';

export const useWaitForTransaction = (
  config?: UseWaitForTransactionArgs & UseWaitForTransactionConfig,
) => {
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
    if (!config?.hash) {
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
          }
        }
      } else {
        setActualHash(config?.hash);
      }
    } catch (error) {
      console.error('Could not fetch safe hash: ', error);
    }

    setIsLoading(false);
  }, [activeConnector?.id, config?.hash, gnosisSafeConnector]);

  useEffect(() => {
    checkSafeTransaction();
  }, [checkSafeTransaction]);

  useInterval(checkSafeTransaction, !actualHash ? 2000 : null);

  return { ...result, isLoading: result.isLoading || isLoading } as const;
};
