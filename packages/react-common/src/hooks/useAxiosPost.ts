import axios, { AxiosRequestHeaders } from "axios";
import { useCallback, useState } from "react";
import { useDeepCompareEffect } from "react-use";

type Config = {
  url: string;
  data: any;
  headers?: AxiosRequestHeaders;
  timeout?: number;
  skip?: boolean;
};

export const useAxiosPost = <T>({
  url,
  data,
  headers,
  timeout,
  skip = true,
}: Config) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const sendPost = useCallback(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    setLoading(true);
    setError(undefined);
    axios
      .post<T>(url, data, {
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
      .catch((error) => {
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
  }, [url, data, timeout]);

  useDeepCompareEffect(() => {
    if (!skip) {
      sendPost();
    }
  }, [url, data, timeout]);

  return [{ data: response, loading, error }, sendPost] as const;
};
