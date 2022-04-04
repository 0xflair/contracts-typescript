import axios, { AxiosRequestHeaders } from "axios";
import { useCallback, useState } from "react";
import { useDeepCompareEffect } from "react-use";

type Config = {
  url: string;
  params?: any;
  headers?: AxiosRequestHeaders;
  timeout?: number;
  skip?: boolean;
};

export const useAxiosGet = <T>({
  url,
  params,
  headers,
  timeout,
  skip = false,
}: Config) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const sendGet = useCallback(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    setLoading(true);
    setError(undefined);
    axios
      .get<T>(url, {
        params,
        cancelToken: source.token,
        timeout: timeout,
        headers,
      })
      .then((a) => {
        if (!unmounted) {
          setResponse(a.data);
          setLoading(false);
        }
      })
      .catch((error: Error) => {
        if (!unmounted) {
          setError(error);
          setLoading(false);
          if (axios.isCancel(error)) {
            console.log(`request cancelled: ${error.message}`);
          } else {
            console.log(`another error happened: ${error.message}`);
          }
        }
      });
    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [url, params, timeout]);

  useDeepCompareEffect(() => {
    if (!skip) {
      sendGet();
    }
  }, [url, params, timeout]);

  return [{ data: response, loading, error }, sendGet] as const;
};
