import axios, { AxiosRequestHeaders } from 'axios';
import { useCallback, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';

import { useCancel } from './useCancel';

type Config = {
  url: string;
  data: any;
  headers?: AxiosRequestHeaders;
  timeout?: number;
  skip?: boolean;
};

export const useAxiosPatch = <T>({
  url,
  data,
  headers,
  timeout,
  skip = true,
}: Config) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

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
      const response = await axios.patch<T>(url, data, {
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

  useDeepCompareEffect(() => {
    if (!skip) {
      sendRequest();
    }
  }, [url, data, timeout]);

  return [{ data: response, loading, error }, sendRequest] as const;
};
