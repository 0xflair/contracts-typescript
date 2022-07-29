import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment, useChainInfo } from '@0xflair/react-common';
import { useRemoteJsonReader } from '@0xflair/react-ipfs';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode } from 'react';
import { Chain, useProvider } from 'wagmi';

import {
  useCollectionMetadataUri,
  useMaxSupply,
  useTotalSupply,
} from '../../extensions';
import { NftCollection, NftCollectionMetadata } from '../../types';
import { useNftCollection } from '../hooks';

type CollectionContextValue = {
  data: {
    // Resources
    env?: Environment;
    chainId?: number;
    chainInfo?: Chain;
    contractAddress?: string;
    contractVersion?: ContractVersion;
    collection?: NftCollection | null;
    collectionMetadata?: NftCollectionMetadata | null;

    // On-chain values
    metadataUri?: BytesLike;
    maxSupply?: BigNumberish;
    totalSupply?: BigNumberish;
  };

  isLoading: {
    // Resources
    collectionLoading?: boolean;
    collectionMetadataLoading?: boolean;

    // On-chain values
    metadataUriLoading?: boolean;
    maxSupplyLoading?: boolean;
    totalSupplyLoading?: boolean;
  };

  error: {
    // Resources
    collectionError?: string | Error | null;
    collectionMetadataError?: string | Error | null;

    // On-chain values
    metadataUriError?: string | Error | null;
    maxSupplyError?: string | Error | null;
    totalSupplyError?: string | Error | null;
  };
};

export const CollectionContext =
  React.createContext<CollectionContextValue | null>(null);

type FunctionalChildren = (
  contextValue: CollectionContextValue,
) => ReactNode | ReactNode[];

type Props = {
  /** Environment can be either 'prod' (default) or 'env' */
  env?: Environment;

  /** ChainID where the token stream is deployed */
  chainId: number | string;

  /** Contract address of the token stream */
  contractAddress: string;

  /** Optional contract version which defaults to stored value on backend, and falls back to latest */
  contractVersion?: ContractVersion;

  /** Child elements or a factory function that returns child elements */
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const CollectionProvider = ({
  env = Environment.PROD,
  chainId: rawChainId,
  contractAddress,
  contractVersion: _contractVersion,
  children,
}: Props) => {
  const chainId = Number(rawChainId);
  const chainInfo = useChainInfo(chainId);

  const {
    data: collection,
    error: collectionError,
    isLoading: collectionLoading,
  } = useNftCollection({
    env,
    chainId,
    contractAddress,
  });

  const contractVersion = _contractVersion || collection?.presetVersion;

  const {
    data: metadataUri,
    error: metadataUriError,
    isLoading: metadataUriLoading,
  } = useCollectionMetadataUri({
    chainId,
    contractVersion,
    contractAddress,
  });

  const {
    data: collectionMetadata,
    error: collectionMetadataError,
    isLoading: collectionMetadataLoading,
  } = useRemoteJsonReader<NftCollectionMetadata>({
    uri: metadataUri,
  });

  const {
    data: maxSupply,
    error: maxSupplyError,
    isLoading: maxSupplyLoading,
  } = useMaxSupply({
    chainId,
    contractVersion,
    contractAddress,
    watch: false,
  });

  const {
    data: totalSupply,
    error: totalSupplyError,
    isLoading: totalSupplyLoading,
  } = useTotalSupply({
    chainId,
    contractVersion,
    contractAddress,
    watch: true,
  });

  const value = {
    data: {
      // Resources
      env,
      chainId,
      chainInfo,
      contractAddress,
      contractVersion,
      collection,
      collectionMetadata,

      // On-chain values
      metadataUri,
      maxSupply,
      totalSupply,
    },

    isLoading: {
      // Resources
      collectionLoading,
      collectionMetadataLoading,

      // On-chain values
      metadataUriLoading,
      maxSupplyLoading,
      totalSupplyLoading,
    },

    error: {
      // Resources
      collectionError,
      collectionMetadataError,

      // On-chain values
      metadataUriError,
      maxSupplyError,
      totalSupplyError,
    },
  };

  return React.createElement(
    CollectionContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children,
  );
};

export const useCollectionContext = () => {
  const context = React.useContext(CollectionContext);
  if (!context) throw Error('Must be used within <CollectionProvider>');
  return context;
};
