import axios from "axios";
import { useCallback, useState } from "react";
import { useDeepCompareEffect } from "react-use";

type Config = {
  url: string;
  params: any;
  timeout?: number;
  skip?: boolean;
};

export const useAxiosGet = <T>({
  url,
  params,
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

    axios
      .get<T>(url, {
        params,
        cancelToken: source.token,
        timeout: timeout,
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
