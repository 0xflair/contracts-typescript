import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { Environment, ZERO_ADDRESS } from '@flair-sdk/common';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { useTieredSalesMinter as useTieredSalesMinter } from '../hooks';
import { useSaleTiers } from '../hooks/useSaleTiers';
import { Tier } from '../types';

type TieredSalesContextValue = {
  data: {
    // Resources
    env?: Environment;
    chainId?: number;
    contractAddress?: string;

    // On-chain values
    tiers?: Record<number, Tier>;

    // Current tier
    currentTierId?: BigNumberish;
    start?: Date;
    end?: Date;
    price?: BigNumberish;
    hasAllowlist?: boolean;
    isActive?: boolean;
    isAllowlisted?: boolean;
    isEligible?: boolean;
    eligibleAmount?: BigNumberish;

    // Helpers
    // maxSupply?: BigNumberish;
    autoDetectedTierId?: BigNumberish;
    canMint?: boolean;
    minterAddress?: BytesLike;

    // Transaction
    txReceipt?: TransactionReceipt;
    txResponse?: TransactionResponse;
  };

  isLoading: {
    // On-chain values
    isAutoDetectingTier?: boolean;
    tiersLoading?: boolean;

    // Transaction
    mintLoading?: boolean;
  };

  error: {
    // On-chain values
    tiersError?: string | Error | null;

    // Transaction
    mintError?: string | Error | null;
  };

  refetchTiers: () => void;
  setCurrentTierId: (currentTierId: BigNumberish) => void;
  // setMaxSupply: (maxSupply: BigNumberish) => void;

  mint: (args?: {
    mintCount: BigNumberish;
    allowlistProof?: BytesLike[];
  }) => void;
};

export const TieredSalesContext =
  React.createContext<TieredSalesContextValue | null>(null);

type FunctionalChildren = (
  contextValue: TieredSalesContextValue,
) => ReactNode | ReactNode[];

type Props = {
  env?: Environment;
  chainId: number | string;
  contractAddress: string;

  tierId?: BigNumberish;
  autoDetectEligibleTier?: boolean;
  minterAddress?: BytesLike;

  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const TieredSalesProvider = ({
  env = Environment.PROD,
  chainId: rawChainId,
  contractAddress,
  children,
  tierId,
  autoDetectEligibleTier = true,
  minterAddress,
}: Props) => {
  const chainId = Number(rawChainId);

  const { data: account } = useAccount();
  const [currentTierId, setCurrentTierId] = useState<BigNumberish | undefined>(
    tierId ? Number(tierId.toString()) : undefined,
  );
  const [maxSupply, setMaxSupply] = useState<BigNumberish>(Infinity);
  const [autoDetectedTierId, setAutoDetectedTierId] = useState<BigNumberish>();
  const [isAutoDetectingTier, setIsAutoDetectingTier] = useState(
    autoDetectEligibleTier,
  );

  const finalMinterAddress = useMemo(() => {
    return minterAddress || account?.address || ZERO_ADDRESS;
  }, [account?.address, minterAddress]);

  const {
    data: tiers,
    error: tiersError,
    isLoading: tiersLoading,
    refetchTiers,
  } = useSaleTiers({
    env,
    chainId,
    contractAddress: contractAddress,
    minterAddress: finalMinterAddress,
    enabled: Boolean(chainId && contractAddress),
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
    error: { mintError, allowlistCheckerError, eligibleAmountError, tierError },
    isLoading: {
      allowlistCheckerLoading,
      eligibleAmountLoading,
      mintLoading,
      tierLoading,
    },
    mint: doMint,
  } = useTieredSalesMinter({
    env,
    chainId,
    contractAddress,
    tierId: currentTierId,
    minterAddress: finalMinterAddress,
  });

  const canMint = Boolean(
    isActive && isEligible && (!hasAllowlist || isAllowlisted) && !mintLoading,
  );

  useEffect(() => {
    if (!autoDetectEligibleTier && tierId !== undefined) {
      if (tierId !== currentTierId) {
        setCurrentTierId(tierId);
      }
    } else if (autoDetectEligibleTier && autoDetectedTierId !== undefined) {
      if (currentTierId === undefined) {
        setCurrentTierId(autoDetectedTierId);
      }
    }
  }, [autoDetectEligibleTier, autoDetectedTierId, currentTierId, tierId]);

  useEffect(() => {
    const tierIds = Object.keys(tiers || {}).map((id) => Number(id));

    if (!tiers || tiersLoading || mintLoading) {
      return;
    }

    if (!tierIds.length) {
      setIsAutoDetectingTier(false);
      return;
    }

    // Find the first tier that is eligible and is active then set it as current tier
    let tierId = tierIds.find((id) => {
      return Boolean(tiers[id].isActive && tiers[id].isEligible);
    });

    // If not found, look for a tier that is active and does nto have allowlist
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isActive && !tiers[id].hasAllowlist);
      });
    }

    // If not found, look for a tier that is just active
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isActive);
      });
    }

    // If not found, look for a tier that is eligible
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isEligible);
      });
    }

    setAutoDetectedTierId(tierId);
    setIsAutoDetectingTier(false);
  }, [
    autoDetectEligibleTier,
    isActive,
    isEligible,
    mintLoading,
    tiers,
    tiersLoading,
  ]);

  const mint = useCallback(
    async (args?: { mintCount: BigNumberish }) => {
      await doMint(args);
      await refetchTiers();
    },
    [doMint, refetchTiers],
  );

  const value = {
    data: {
      // On-chain values
      tiers,

      // Current tier
      currentTierId,
      start,
      end,
      price,
      hasAllowlist,
      isActive,
      isAllowlisted,
      eligibleAmount,
      isEligible,

      // Helpers
      // maxSupply,
      autoDetectedTierId,
      canMint,
      minterAddress: finalMinterAddress,

      // Transaction
      txReceipt,
      txResponse,
    },

    isLoading: {
      // Helpers
      isAutoDetectingTier,
      tiersLoading,
      allowlistCheckerLoading,
      eligibleAmountLoading,

      // Transaction
      mintLoading,
    },

    error: {
      // Helpers
      tiersError,
      allowlistCheckerError,
      eligibleAmountError,

      // Transaction
      mintError,
    },

    refetchTiers,
    setCurrentTierId,
    // setMaxSupply,
    mint,
  };

  return React.createElement(
    TieredSalesContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children,
  );
};

export const useTieredSalesContext = () => {
  const context = React.useContext(TieredSalesContext);
  if (!context) throw Error('Must be used within <TieredSalesProvider>');
  return context;
};
