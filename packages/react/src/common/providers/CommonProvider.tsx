import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { deserialize, serialize } from 'wagmi';

const localStoragePersister =
  typeof window !== 'undefined'
    ? createSyncStoragePersister({
        key: 'flair.cache',
        storage: window?.localStorage,
        serialize,
        deserialize,
      })
    : undefined;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1_000 * 60 * 60 * 24,
      staleTime: 0,
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

if (localStoragePersister) {
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  });
}

type Props = {
  children?: React.ReactNode;
};

export const CommonProvider = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
