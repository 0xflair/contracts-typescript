import { Environment } from '@0xflair/react-common';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useSaleMinter } from '../../minting';

type CollectionSalesMintingContextValue = {
  data: ReturnType<typeof useCollectionContext>['data'] & {
    // On-chain values
    preSaleStatus?: boolean;
    preSalePrice?: BigNumberish;
    preSaleIsAllowlisted?: boolean;
    publicSaleStatus?: boolean;
    publicSalePrice?: BigNumberish;

    // Helpers
    canMint?: boolean;

    // Transaction
    txReceipt?: TransactionReceipt;
    txResponse?: TransactionResponse;
  };

  isLoading: ReturnType<typeof useCollectionContext>['isLoading'] & {
    // Resources
    collectionLoading?: boolean;
    collectionMetadataLoading?: boolean;

    // On-chain values
    metadataUriLoading?: boolean;
    maxSupplyLoading?: boolean;
    totalSupplyLoading?: boolean;

    // Transaction
    mintLoading?: boolean;
  };

  error: ReturnType<typeof useCollectionContext>['error'] & {
    // Resources
    collectionError?: string | Error | null;
    collectionMetadataError?: string | Error | null;

    // On-chain values
    metadataUriError?: string | Error | null;
    maxSupplyError?: string | Error | null;
    totalSupplyError?: string | Error | null;

    // Transaction
    mintError?: string | Error | null;
  };

  mint: (args?: {
    mintCount: BigNumberish;
    allowlistProof?: BytesLike[];
  }) => void;
};

export const CollectionSalesMintingContext =
  React.createContext<CollectionSalesMintingContextValue | null>(null);

type FunctionalChildren = (
  contextValue: CollectionSalesMintingContextValue
) => ReactNode | ReactNode[];

type Props = {
  env?: Environment;

  /** Child elements or a factory function that returns child elements */
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const CollectionSalesMintingProvider = ({
  env = Environment.PROD,
  children,
}: Props) => {
  const { data: account } = useAccount();
  const { data, isLoading, error } = useCollectionContext();

  const {
    data: {
      preSaleStatus,
      preSalePrice,
      preSaleIsAllowlisted,
      publicSaleStatus,
      publicSalePrice,
      txReceipt,
      txResponse,
    },
    error: mintError,
    isLoading: mintLoading,
    mint,
  } = useSaleMinter({
    env,
    chainId: Number(data.chainId),
    contractVersion: data.collection?.presetVersion,
    contractAddress: data.contractAddress,
    minterAddress: account?.address,
  });

  const canMint =
    ((preSaleStatus && preSaleIsAllowlisted) || publicSaleStatus) &&
    !mintLoading;

  const value = {
    data: {
      // Common
      ...data,

      // On-chain values
      preSaleStatus,
      preSalePrice,
      preSaleIsAllowlisted,
      publicSaleStatus,
      publicSalePrice,

      // Helpers
      canMint,

      // Transaction
      txReceipt,
      txResponse,
    },

    isLoading: {
      // Common
      ...isLoading,

      // Transaction
      mintLoading,
    },

    error: {
      // Common
      ...error,

      // Transaction
      mintError,
    },

    mint,
  };

  return React.createElement(
    CollectionSalesMintingContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children
  );
};

export const useCollectionSalesMintingContext = () => {
  const context = React.useContext(CollectionSalesMintingContext);
  if (!context)
    throw Error('Must be used within <CollectionSalesMintingProvider>');
  return context;
};
