import axios, { AxiosRequestHeaders } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useCancel } from './useCancel';

type Config = {
  url: string;
  params?: any;
  headers?: AxiosRequestHeaders;
  timeout?: number;
  enabled?: boolean;
};

export const useAxiosGet = <T>({
  url,
  params,
  headers,
  timeout,
  enabled = true,
}: Config) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState(enabled);

  const cancelQuery = useCancel();
  const sendRequest = useCallback(
    async (
      overrides?: Partial<
        Pick<Config, 'url' | 'params' | 'headers' | 'timeout'>
      >,
    ) => {
      let didCancel = false;
      let source = axios.CancelToken.source();
      cancelQuery(() => {
        didCancel = true;
        source.cancel('Cancelling in cleanup');
      });
      try {
        setLoading(true);
        setError(undefined);
        const response = await axios.get<T>(overrides?.url || url, {
          params: overrides?.params || params,
          cancelToken: source.token,
          timeout: overrides?.timeout || timeout,
          headers: overrides?.headers || headers,
        });
        if (!didCancel) {
          setResponse(response.data);
          setLoading(false);
        }
        return response;
      } catch (error: any) {
        if (!didCancel) {
          setError(error);
          setLoading(false);
          if (axios.isCancel(error)) {
            console.log(`request cancelled: ${error.message}`);
          } else {
            console.log(`another error happened: ${error.message}`);
          }
        }
      }
    },
    [cancelQuery, url, params, timeout, headers],
  );

  useEffect(() => {
    if (enabled) {
      sendRequest();
    }
  }, [url, params, timeout, enabled, sendRequest]);

  return {
    data: response || undefined,
    isLoading,
    error,
    sendRequest,
  } as const;
};
