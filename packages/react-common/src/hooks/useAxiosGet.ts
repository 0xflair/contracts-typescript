import axios from "axios";
import { useState } from "react";
import { useDeepCompareEffect } from "react-use";

export const useAxiosGet = <T>(url: string, params: any, timeout?: number) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(true);

  useDeepCompareEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
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
      .catch((e: Error) => {
        if (!unmounted) {
          setError(true);
          setErrorMessage(e.message);
          setLoading(false);
          if (axios.isCancel(e)) {
            console.log(`request cancelled: ${e.message}`);
          } else {
            console.log(`another error happened: ${e.message}`);
          }
        }
      });
    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [url, params, timeout]);

  return { response, loading, error, errorMessage };
};
