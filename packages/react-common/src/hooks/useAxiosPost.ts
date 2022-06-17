import axios, { AxiosRequestHeaders } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useCancel } from './useCancel';

type Config = {
  url: string;
  data: any;
  headers?: AxiosRequestHeaders;
  timeout?: number;
  enabled?: boolean;
};

export const useAxiosPost = <T>({
  url,
  data,
  headers,
  timeout,
  enabled = false,
}: Config) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState(false);

  const cancelQuery = useCancel();
  const sendRequest = useCallback(async () => {
    let didCancel = false;
    let source = axios.CancelToken.source();
    cancelQuery(() => {
      didCancel = true;
      source.cancel('Cancelling in cleanup');
    });
    try {
      setLoading(true);
      setError(undefined);
      const response = await axios.post<T>(url, data, {
        cancelToken: source.token,
        timeout: timeout,
        headers,
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
  }, [cancelQuery, url, data, timeout, headers]);

  useEffect(() => {
    if (enabled) {
      sendRequest();
    }
  }, [url, data, timeout, enabled, sendRequest]);

  return { data: response, isLoading, error, sendRequest } as const;
};
