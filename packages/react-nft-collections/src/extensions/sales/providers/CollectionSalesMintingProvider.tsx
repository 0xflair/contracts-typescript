import { ZERO_ADDRESS } from '@0xflair/common';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useSaleMinter } from '../../minting/useSaleMinter';
import { useSaleTiers } from '../hooks/useSaleTiers';

type CollectionSalesMintingContextValue = {
  data: ReturnType<typeof useCollectionContext>['data'] & {
    currentTierId?: BigNumberish;

    // On-chain values
    start?: Date;
    end?: Date;
    price?: BigNumberish;
    hasAllowlist?: boolean;
    isActive?: boolean;
    isAllowlisted?: boolean;
    isEligible?: boolean;
    eligibleAmount?: BigNumberish;

    // Helpers
    canMint?: boolean;
    soldOut?: boolean;

    // Transaction
    txReceipt?: TransactionReceipt;
    txResponse?: TransactionResponse;
  };

  isLoading: ReturnType<typeof useCollectionContext>['isLoading'] & {
    // Resources
    collectionLoading?: boolean;
    collectionMetadataLoading?: boolean;

    // On-chain values
    isAutoDetectingTier?: boolean;
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

  setCurrentTierId: (currentTierId: BigNumberish) => void;

  mint: (args?: {
    mintCount: BigNumberish;
    allowlistProof?: BytesLike[];
  }) => void;
};

export const CollectionSalesMintingContext =
  React.createContext<CollectionSalesMintingContextValue | null>(null);

type FunctionalChildren = (
  contextValue: CollectionSalesMintingContextValue,
) => ReactNode | ReactNode[];

type Props = {
  /** Child elements or a factory function that returns child elements */
  children: FunctionalChildren | ReactNode | ReactNode[];

  defaultTier?: BigNumberish;

  autoDetectEligibleTier?: boolean;

  minterAddress?: BytesLike;
};

export const CollectionSalesMintingProvider = ({
  children,
  defaultTier = 0,
  autoDetectEligibleTier = true,
  minterAddress,
}: Props) => {
  const { data: account } = useAccount();
  const { data, isLoading, error } = useCollectionContext();
  const [currentTierId, setCurrentTierId] = useState<BigNumberish>(
    Number(defaultTier.toString()),
  );
  const [isAutoDetectingTier, setIsAutoDetectingTier] = useState(
    autoDetectEligibleTier,
  );

  const {
    data: tiers,
    error: tiersError,
    isLoading: tiersLoading,
    refetchTiers,
  } = useSaleTiers({
    env: data.env,
    chainId: Number(data.chainId),
    contractVersion: data.contractVersion,
    contractAddress: data.contractAddress,
    minterAddress,
  });

  const {
    data: {
      txReceipt,
      txResponse,
      start,
      end,
      price,
      hasAllowlist,
      isActive,
      isAllowlisted,
      isEligible,
      eligibleAmount,
    },
    error: mintError,
    isLoading: mintLoading,
    mint,
  } = useSaleMinter({
    env: data.env,
    chainId: Number(data.chainId),
    contractVersion: data.contractVersion,
    contractAddress: data.contractAddress,
    tierId: currentTierId,
    minterAddress: minterAddress || account?.address || ZERO_ADDRESS,
  });

  const soldOut = Boolean(
    data.totalSupply &&
      data.maxSupply &&
      Number(data.totalSupply.toString()) >= Number(data.maxSupply.toString()),
  );

  const canMint = Boolean(
    isActive &&
      isEligible &&
      (!hasAllowlist || isAllowlisted) &&
      !soldOut &&
      !mintLoading,
  );

  useEffect(() => {
    if (!autoDetectEligibleTier) {
      setIsAutoDetectingTier(false);
      return;
    }

    const tierIds = Object.keys(tiers || {}).map((id) => Number(id));

    if (
      !autoDetectEligibleTier ||
      tiersLoading ||
      mintLoading ||
      !tierIds.length
    ) {
      return;
    }

    // Find the first tier that is eligible and is active then set it as current tier
    let tierId = tierIds.find((id) => {
      return Boolean(tiers[id].isActive && tiers[id].isEligible);
    });

    // If not found, look for a tier that is active and does nto have allowlist
    if (!tierId) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isActive && !tiers[id].hasAllowlist);
      });
    }

    // If not found, look for a tier that is just active
    if (!tierId) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isActive);
      });
    }

    // If not found, look for a tier that is eligible
    if (!tierId) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isEligible);
      });
    }

    setCurrentTierId(tierId || 0);
    setIsAutoDetectingTier(false);
  }, [
    autoDetectEligibleTier,
    isActive,
    isEligible,
    mintLoading,
    tiers,
    tiersLoading,
  ]);

  const value = {
    data: {
      // Common
      ...data,
      currentTierId,

      // On-chain values
      start,
      end,
      price,
      hasAllowlist,
      isActive,
      isAllowlisted,
      eligibleAmount,
      isEligible,

      // Helpers
      canMint,
      soldOut,

      // Transaction
      txReceipt,
      txResponse,
    },

    isLoading: {
      // Common
      ...isLoading,
      tiersLoading,
      isAutoDetectingTier,

      // Transaction
      mintLoading,
    },

    error: {
      // Common
      ...error,
      tiersError,

      // Transaction
      mintError: mintError as Error,
    },

    setCurrentTierId,
    mint,
  };

  return React.createElement(
    CollectionSalesMintingContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children,
  );
};

export const useCollectionSalesMintingContext = () => {
  const context = React.useContext(CollectionSalesMintingContext);
  if (!context)
    throw Error('Must be used within <CollectionSalesMintingProvider>');
  return context;
};
