import { TransactionReceipt } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { SendTransactionResult } from '@wagmi/core';
import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers';
import _ from 'lodash';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { useChainInfo } from '../../../../common';
import { useBalanceRampConfig } from '../../../../core';
import { useTieredSalesMinter } from '../hooks';
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
    rampConfig?: ReturnType<typeof useBalanceRampConfig>['data'];
    mintCount?: BigNumberish;
    autoDetectedTierId?: BigNumberish;
    canMint?: boolean;
    isERC20Payment?: boolean;
    isApproveNeeded?: boolean;
    minterAddress?: BytesLike;

    // Transaction
    approveReceipt?: TransactionReceipt;
    approveResponse?: SendTransactionResult;
    mintReceipt?: TransactionReceipt;
    mintResponse?: SendTransactionResult;
  };

  isLoading: {
    // On-chain values
    isAutoDetectingTier?: boolean;
    tiersLoading?: boolean;

    // Helpers
    allowanceLoading: boolean;
    approveLoading: boolean;

    // Transaction
    mintLoading?: boolean;
  };

  error: {
    // On-chain values
    tiersError?: string | Error | null;

    // Helpers
    allowanceError?: string | Error | null;
    approveError?: string | Error | null;

    // Transaction
    mintError?: string | Error | null;
  };

  refetchTiers: () => void;
  setCurrentTierId: (currentTierId: BigNumberish) => void;
  // setMaxSupply: (maxSupply: BigNumberish) => void;

  setMintCount: (mintCount: BigNumberish) => void;
  approve?: (args?: { mintCount: BigNumberish }) => void;
  mint?: (
    args?: {
      mintCount: BigNumberish;
      allowlistProof?: BytesLike[];
    },
    overrides?: Partial<ethers.CallOverrides>,
  ) => void;
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
    totalAmount: BigNumberish;
    mintCount: BigNumberish;
    txReceipt?: TransactionReceipt;
    txResponse?: SendTransactionResult;
  }) => void;
  onApproveSuccess?: (args: {
    spender: BytesLike;
    amount: BigNumberish;
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
  onApproveSuccess,
}: Props) => {
  const chainId = Number(rawChainId);
  const chainInfo = useChainInfo(chainId);

  const { address } = useAccount();
  const [currentTierId, setCurrentTierId] = useState<BigNumberish | undefined>(
    tierId !== undefined ? Number(tierId.toString()) : undefined,
  );
  // const [maxSupply, setMaxSupply] = useState<BigNumberish>(Infinity);
  const [autoDetectedTierId, setAutoDetectedTierId] = useState<BigNumberish>();
  const [mintCount, setMintCount] = useState<BigNumberish>(1);
  const [isAutoDetectingTier, setIsAutoDetectingTier] = useState(true);

  const finalMinterAddress = minterAddress || address;

  const {
    data: tiers,
    error: tiersError,
    isLoading: tiersLoading,
    refetch: refetchTiers,
    fetchStatus: tiersFetchStatus,
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
      requiredAmounts,
      mintPreparedConfig,
      approveReceipt,
      approveResponse,
      mintReceipt,
      mintResponse,
      start,
      end,
      price,
      hasAllowlist,
      isActive,
      isAllowlisted,
      isEligible,
      eligibleAmount,
      isApproveNeeded,
      isERC20Payment,
    },
    error: {
      tierError,
      eligibleAmountError,
      allowlistCheckerError,
      allowanceError,
      approveError,
      mintError,
    },
    isLoading: {
      tierLoading,
      eligibleAmountLoading,
      allowlistCheckerLoading,
      allowanceLoading,
      approveLoading,
      mintLoading,
    },
    mint: doMint,
    approve: doApprove,
  } = useTieredSalesMinter({
    env,
    chainId,
    contractAddress,
    tierId: currentTierId,
    minterAddress: finalMinterAddress,
    mintCount,
  });

  const rampRequest = useMemo(() => {
    return {
      chainId: chainId.toString(),
      walletAddress: requiredAmounts?.[0].accounts?.[0]?.toString(),
      txTo: contractAddress,
      txFrom:
        minterAddress?.toString() ||
        requiredAmounts?.[0].accounts?.[0]?.toString(),
      txValue: mintPreparedConfig?.request?.value?.toString(),
      txData: mintPreparedConfig?.request?.data?.toString(),
      inputCurrency: 'USD',
      outputTokenAddress: requiredAmounts?.[0].token?.toString(),
      outputAmount: requiredAmounts?.[0].value?.toString(),
      testMode: chainInfo?.testnet,
    };
  }, [
    chainId,
    chainInfo?.testnet,
    contractAddress,
    mintPreparedConfig?.request?.data,
    mintPreparedConfig?.request?.value,
    minterAddress,
    requiredAmounts,
  ]);

  const { data: rampConfig } = useBalanceRampConfig({
    env,
    rampRequest,
    enabled: Boolean(rampRequest),
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
    tiersLoading,
  ]);

  const mint = useCallback(
    async (
      args?: { mintCount: BigNumberish },
      overrides?: Partial<ethers.CallOverrides>,
    ) => {
      const result = await doMint?.(args, overrides);

      if (result) {
        if (result.receipt?.status === 0) {
          throw new Error(
            'Failed to mint, transaction reverted! Check Etherscan for reason.',
          );
        } else {
          onMintSuccess &&
            onMintSuccess({
              totalAmount: result.totalAmount,
              mintCount: result.mintCount,
              txReceipt: result.receipt,
              txResponse: result.response,
            });
        }
      }

      await refetchTiers();
    },
    [doMint, onMintSuccess, refetchTiers],
  );

  const approve = useCallback(
    async (args?: { mintCount: BigNumberish }) => {
      const result = await doApprove?.(args);

      if (result) {
        onApproveSuccess &&
          onApproveSuccess({
            amount: result.amount,
            spender: result.spender,
            txReceipt: result.receipt,
            txResponse: result.response,
          });
      }

      await refetchTiers();
    },
    [doApprove, onApproveSuccess, refetchTiers],
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
      rampConfig,
      autoDetectedTierId,
      mintCount,
      canMint,
      isERC20Payment,
      isApproveNeeded,
      minterAddress: finalMinterAddress,

      // Transaction
      approveReceipt,
      approveResponse,
      mintReceipt,
      mintResponse,
    },

    isLoading: {
      // Helpers
      tierLoading,
      tiersLoading,
      isAutoDetectingTier,
      allowlistCheckerLoading,
      eligibleAmountLoading,
      allowanceLoading,

      // Transaction
      approveLoading,
      mintLoading,
    },

    error: {
      // Helpers
      tierError,
      tiersError,
      allowlistCheckerError,
      eligibleAmountError,
      allowanceError,

      // Transaction
      approveError,
      mintError,
    },

    refetchTiers,
    setCurrentTierId,
    // setMaxSupply,
    setMintCount,

    mint: doMint ? mint : undefined,
    approve: doApprove ? approve : undefined,
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
