import { TransactionReceipt } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { SendTransactionResult } from '@wagmi/core';
import { BigNumber, BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
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
    txResponse?: SendTransactionResult;
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

  mint?: (args: {
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
  autoSelectEligibleTier?: boolean;
  minterAddress?: BytesLike;
  onMintSuccess?: (args: {
    mintCount: BigNumberish;
    txReceipt?: TransactionReceipt;
    txResponse?: SendTransactionResult;
  }) => void;

  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const TieredSalesProvider = ({
  env = Environment.PROD,
  chainId: rawChainId,
  contractAddress,
  children,
  tierId,
  autoSelectEligibleTier = true,
  minterAddress,
  onMintSuccess,
}: Props) => {
  const chainId = Number(rawChainId);

  const { address } = useAccount();
  const [currentTierId, setCurrentTierId] = useState<BigNumberish | undefined>(
    tierId !== undefined ? Number(tierId.toString()) : undefined,
  );
  const [maxSupply, setMaxSupply] = useState<BigNumberish>(Infinity);
  const [autoDetectedTierId, setAutoDetectedTierId] = useState<BigNumberish>();
  const [isAutoDetectingTier, setIsAutoDetectingTier] = useState(true);

  const finalMinterAddress = minterAddress || address;

  const {
    data: tiers,
    error: tiersError,
    isLoading: tiersLoading,
    refetch: refetchTiers,
    fetchStatus: tiersFetchStatus,
    isStale: tiersIsStale,
    isPreviousData: tiersIsPreviousData,
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
    if (autoSelectEligibleTier) {
      if (autoDetectedTierId !== undefined && currentTierId === undefined) {
        setCurrentTierId(autoDetectedTierId);
      }
    } else if (tierId !== undefined) {
      if (tierId !== currentTierId) {
        setCurrentTierId(tierId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSelectEligibleTier, autoDetectedTierId, tierId]);

  useEffect(() => {
    if (
      tiers === undefined ||
      tiersLoading ||
      mintLoading ||
      tiersIsStale ||
      tiersIsStale ||
      tiersIsPreviousData ||
      tiersFetchStatus !== 'idle'
    ) {
      return;
    }

    const tierIds = Object.keys(tiers).map((id) => Number(id));

    // Find the first tier that is eligible and is active and has remaining supply
    let tierId = tierIds.find((id) => {
      return Boolean(
        tiers[id].isActive &&
          tiers[id].isEligible &&
          (tiers[id].remainingSupply === undefined ||
            BigNumber.from(tiers[id].remainingSupply).gt(0)),
      );
    });

    // If not found, look for a tier that is active and does not have allowlist and has remaining supply
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(
          tiers[id].isActive &&
            !tiers[id].hasAllowlist &&
            (tiers[id].remainingSupply === undefined ||
              BigNumber.from(tiers[id].remainingSupply).gt(0)),
        );
      });
    }

    // If not found, look for a tier that is not active but eligible and has remaining supply
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(
          tiers[id].isEligible &&
            (tiers[id].remainingSupply === undefined ||
              BigNumber.from(tiers[id].remainingSupply).gt(0)),
        );
      });
    }

    // If not found, look for a tier that is just eligible
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isEligible);
      });
    }

    // If not found, look for a tier that is just active and has remaining supply
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(
          tiers[id].isActive &&
            (tiers[id].remainingSupply === undefined ||
              BigNumber.from(tiers[id].remainingSupply).gt(0)),
        );
      });
    }

    // If not found, look for a tier that is just active
    if (tierId === undefined) {
      tierId = tierIds.find((id) => {
        return Boolean(tiers[id].isActive);
      });
    }

    if (tierId !== undefined) {
      setAutoDetectedTierId(tierId);
    }

    setIsAutoDetectingTier(false);
  }, [
    isActive,
    isEligible,
    mintLoading,
    tiers,
    tiersFetchStatus,
    tiersIsPreviousData,
    tiersIsStale,
    tiersLoading,
  ]);

  const mint = useCallback(
    async (args: { mintCount: BigNumberish }) => {
      const result = await doMint?.(args);

      if (result) {
        onMintSuccess &&
          onMintSuccess({
            ...args,
            txReceipt: result.receipt,
            txResponse: result.response,
          });
      }

      await refetchTiers();
    },
    [doMint, onMintSuccess, refetchTiers],
  );

  const value = {
    data: {
      env,
      chainId,
      contractAddress,

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
    mint: doMint ? mint : undefined,
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
