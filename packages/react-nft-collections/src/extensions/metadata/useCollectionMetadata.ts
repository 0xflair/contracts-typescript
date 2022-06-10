import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig } from '@0xflair/react-common';
import { useRemoteJsonReader } from '@0xflair/react-ipfs';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useCallback } from 'react';

import { NftCollectionMetadata } from '../../types';
import { useCollectionMetadataUri } from './useCollectionMetadataUri';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useCollectionMetadata = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  enabled,
  watch = false,
}: Config) => {
  const {
    data: contractURI,
    error: contractURIError,
    isLoading: contractURILoading,
    refetch: contractURIRefetch,
  } = useCollectionMetadataUri({
    contractVersion,
    contractAddress,
    signerOrProvider,
    enabled,
    watch,
  });

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
