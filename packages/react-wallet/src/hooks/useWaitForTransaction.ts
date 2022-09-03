import { useEffect, useState } from 'react';
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
  const { connectors } = useConnect();
  const [actualHash, setActualHash] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const gnosisSafeConnector = connectors.find(({ id }) => id === 'safe') as
    | SafeConnector
    | undefined;

  const result = useWaitForTransactionWagmi({
    ...config,
    hash: actualHash,
  });

  useEffect(() => {
    (async () => {
      if (!config?.hash) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const actualTx = await gnosisSafeConnector?.getTransactionBySafeHash(
          config?.hash,
        );

        if (actualTx?.txHash) {
          setActualHash(actualTx.txHash);
        } else {
          setActualHash(config?.hash);
        }
      } catch (error) {
        console.error('Could not fetch safe hash: ', error);
      }

      setIsLoading(false);
    })();
  }, [config?.hash, gnosisSafeConnector]);

  return { ...result, isLoading: result.isLoading || isLoading } as const;
};
