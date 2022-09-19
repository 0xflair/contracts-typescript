import { useCallback } from 'react';

import { PredefinedReadContractConfig } from '../../../../common';
import { useRemoteJsonReader } from '../../../ipfs';
import { NftCollectionMetadata } from '../../types';
import { useCollectionMetadataUri } from './useCollectionMetadataUri';

export const useCollectionMetadata = ({
  enabled,
  ...config
}: PredefinedReadContractConfig) => {
  const {
    data: contractURI,
    error: contractURIError,
    isLoading: contractURILoading,
    refetch: contractURIRefetch,
  } = useCollectionMetadataUri(config);

  const {
    data: collectionMetadata,
    error: collectionMetadataError,
    isLoading: collectionMetadataLoading,
    sendRequest: fetchContractMetadata,
  } = useRemoteJsonReader<NftCollectionMetadata>({
    uri: contractURI,
    enabled,
  });

  const readCollectionMetadata = useCallback(async () => {
    await contractURIRefetch();
    return await fetchContractMetadata();
  }, [contractURIRefetch, fetchContractMetadata]);

  return {
    data: collectionMetadata,
    error: !collectionMetadata
      ? collectionMetadataError || contractURIError
      : undefined,
    isLoading: collectionMetadataLoading || contractURILoading,
    readCollectionMetadata,
  } as const;
};
