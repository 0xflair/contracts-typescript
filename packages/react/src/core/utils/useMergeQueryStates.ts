import { UseQueryResult } from '@tanstack/react-query';

export const useMergeQueryStates = (
  results: Partial<UseQueryResult | any>[],
) => {
  const isLoading = results.some((result) => result.isLoading);
  const isLoadingError = results.some((result) => result.isLoadingError);
  const isFetching = results.some((result) => result.isFetching);
  const isFetched = results.every((result) => result.isFetched);
  const isFetchedAfterMount = results.some(
    (result) => result.isFetchedAfterMount,
  );
  const isPaused = results.some((result) => result.isPaused);
  const isPreviousData = results.some((result) => result.isPreviousData);
  const isRefetchError = results.some((result) => result.isRefetchError);
  const isError = results.some((result) => result.isError);
  const isSuccess = results.every((result) => result.isSuccess);
  const isInitialLoading = results.some((result) => result.isInitialLoading);
  const isRefetching = results.some((result) => result.isRefetching);
  const isStale = results.some((result) => result.isStale);
  const failureCount = results.reduce(
    (acc, result) => acc + result.failureCount,
    0,
  );

  const error = results.find((result) => result.isError && result.error)?.error;
  const fetchStatus: UseQueryResult['fetchStatus'] =
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
    isStale,
    isPaused,
    isPreviousData,
    isRefetchError,
    isLoadingError,
    isFetchedAfterMount,
    failureCount,
    fetchStatus,
    error,
  } as const;
};
