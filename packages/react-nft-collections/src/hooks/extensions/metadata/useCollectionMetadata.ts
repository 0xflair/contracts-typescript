import { Version } from '@0xflair/contracts-registry';
import { useRemoteJsonReader } from '@0xflair/react-ipfs';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useCallback } from 'react';

import { NftCollectionMetadata } from '../../../types';
import { useCollectionMetadataUri } from './useCollectionMetadataUri';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  skip?: boolean;
  watch?: boolean;
};

export const useCollectionMetadata = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch = false,
}: Config) => {
  const [
    { data: contractURI, error: contractURIError, loading: contractURILoading },
    contractURIRead,
  ] = useCollectionMetadataUri({
    contractAddress,
    version,
    signerOrProvider,
    skip,
    watch,
  });

  const [
    {
      data: collectionMetadata,
      error: collectionMetadataError,
      loading: collectionMetadataLoading,
    },
    fetchContractMetadata,
  ] = useRemoteJsonReader<NftCollectionMetadata>({
    uri: contractURI,
    skip,
  });

  const readCollectionMetadata = useCallback(async () => {
    await contractURIRead();
    await fetchContractMetadata();
  }, [contractURIRead, fetchContractMetadata]);

  return [
    {
      data: collectionMetadata,
      error: !collectionMetadata
        ? collectionMetadataError || contractURIError
        : undefined,
      loading: collectionMetadataLoading || contractURILoading,
    },
    readCollectionMetadata,
  ] as const;
};
