import { useQuery } from '@tanstack/react-query';

export const useMergeQueryStates = (
  results: Partial<ReturnType<typeof useQuery<any, any, any>> | any>[],
) => {
  const isLoading = results.some((result) => result.isLoading);
  const isFetching = results.some((result) => result.isFetching);
  const isFetched = results.every((result) => result.isFetched);
  const isError = results.some((result) => result.isError);
  const isSuccess = results.every((result) => result.isSuccess);
  const isInitialLoading = results.some((result) => result.isInitialLoading);
  const isRefetching = results.some((result) => result.isRefetching);

  const error = results.find((result) => result.isError && result.error)?.error;
  const fetchStatus =
    results
      .map((result) => result.fetchStatus)
      .find((status) => status !== 'idle') || 'idle';

  return {
    isLoading,
    isFetching,
    isFetched,
    isError,
    isSuccess,
    isInitialLoading,
    isRefetching,
    fetchStatus,
    error,
  } as const;
};
