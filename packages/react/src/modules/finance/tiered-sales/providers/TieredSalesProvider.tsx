import { TransactionReceipt } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { PrepareWriteContractConfig, SendTransactionResult } from '@wagmi/core';
import { BigNumber, BigNumberish, BytesLike } from 'ethers';
import _ from 'lodash';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { useChainInfo } from '../../../../common';
import { useDiamondContext } from '../../../../core';
import { useBalanceRampRequestConfig } from '../../../../core/balance-ramp/hooks/useBalanceRampRequestConfig';
import { useContractDecimals } from '../../../token/metadata/hooks/useContractDecimals';
import { useTieredSalesMinter } from '../hooks';
import { useSaleTiers } from '../hooks/useSaleTiers';
import { Tier, TiersDictionary } from '../types';

type TieredSalesContextValue = {
  data: {
    // Resources
    env?: Environment;
    chainId?: number;
    contractAddress?: string;
    contractDecimals?: BigNumberish;

    // On-chain values
    tiers?: Record<string, Tier>;

    // Current tier
    currentTierId?: BigNumberish;
    currentTierConfig?: Tier;
    start?: Date;
    end?: Date;
    price?: BigNumberish;
    hasAllowlist?: boolean;
    isActive?: boolean;
    isAllowlisted?: boolean;
    isEligible?: boolean;
    eligibleAmount?: BigNumberish;

    // Helpers
    mintCount?: string;
    autoDetectedTierId?: BigNumberish;
    canMint?: boolean;
    isERC20Payment?: boolean;
    isApproveNeeded?: boolean;
    minterAddress?: BytesLike;
    rampRequestConfig?: ReturnType<typeof useBalanceRampRequestConfig>['data'];

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
    rampRequestConfigLoading: boolean;

    // Transaction
    mintLoading?: boolean;
  };

  error: {
    // On-chain values
    tiersError?: string | Error | null;

    // Helpers
    allowanceError?: string | Error | null;
    approveError?: string | Error | null;
    rampRequestConfigError?: string | Error | null;

    // Transaction
    mintError?: string | Error | null;
  };

  refetchTiers: () => void;
  setCurrentTierId: (currentTierId: BigNumberish) => void;

  setMintCount: (mintCount: string) => void;
  approve?: (args?: { mintCount: BigNumberish }) => void;
  mint?: (
    args?: {
      mintCount: BigNumberish;
      allowlistProof?: BytesLike[];
    },
    overrides?: Partial<PrepareWriteContractConfig['overrides']>,
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
  contractAddress: `0x${string}`;
  tierId?: BigNumberish;
  tiersCacheTime?: number;
  tiersStaleTime?: number;
  autoSelectEligibleTier?: boolean;
  minterAddress?: BytesLike;
  onMintSuccess?: (args: {
    currentTierId: BigNumberish;
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
  tiersCacheTime,
  tiersStaleTime,
  autoSelectEligibleTier = true,
  minterAddress,
  onMintSuccess,
  onApproveSuccess,
}: Props) => {
  const chainId = Number(rawChainId);
  const chainInfo = useChainInfo(chainId);

  const { address: account } = useAccount();
  const [currentTierId, setCurrentTierId] = useState<BigNumberish | undefined>(
    tierId !== undefined ? Number(tierId.toString()) : undefined,
  );
  const [autoDetectedTierId, setAutoDetectedTierId] = useState<BigNumberish>();
  const [mintCount, setMintCount] = useState<string>();
  const [isAutoDetectingTier, setIsAutoDetectingTier] = useState(true);

  const finalMinterAddress = minterAddress || account;

  const {
    data: contractTiers,
    error: tiersError,
    isLoading: tiersLoading,
    fetchStatus: tiersFetchStatus,
    isPreviousData: tiersIsPreviousData,
    refetch: refetchTiers,
  } = useSaleTiers({
    env,
    chainId,
    contractAddress,
    minterAddress: finalMinterAddress,
    enabled: Boolean(chainId && contractAddress),
    cacheTime: tiersCacheTime || 24 * 60 * 60 * 1000,
    staleTime: tiersStaleTime || 0,
    cacheOnBlock: false,
  });

  const {
    data: { diamond, configValues },
  } = useDiamondContext();

  const diamondConfigTiers = (diamond?.config?.['admin:erc1155-tiered-sales']
    ?.tiers ||
    diamond?.config?.['admin:erc721-tiered-sales']?.tiers ||
    diamond?.config?.['admin:erc20-tiered-sales']?.tiers ||
    diamond?.config?.['admin:tiered-sales']?.tiers) as Record<string, Tier>;
  const configValuesTiers = (configValues?.['admin:erc1155-tiered-sales']
    ?.tiers ||
    configValues?.['admin:erc721-tiered-sales']?.tiers ||
    configValues?.['admin:erc20-tiered-sales']?.tiers ||
    configValues?.['admin:tiered-sales']?.tiers) as Record<string, Tier>;

  // Grab off-chain only tier values (metadataUri) from configValues or diamondConfigValues
  const configValuesTierIds = Object.keys(configValuesTiers || {});
  const diamondConfigTierIds = Object.keys(diamondConfigTiers || {});
  const contractTierIds = Object.keys(contractTiers || {});
  const tierIds = useMemo(
    () => [
      ...new Set([
        ...configValuesTierIds,
        ...diamondConfigTierIds,
        ...contractTierIds,
      ]),
    ],
    [configValuesTierIds, contractTierIds, diamondConfigTierIds],
  );
  const tiers: TiersDictionary = useMemo(
    () =>
      tierIds.reduce((acc, tierId) => {
        const tier = {
          ...diamondConfigTiers?.[tierId],
          ...configValuesTiers?.[tierId],
          ...contractTiers?.[tierId],
          metadataUri:
            configValuesTiers?.[tierId]?.metadataUri ||
            diamondConfigTiers?.[tierId]?.metadataUri,
          hideTierForUsers:
            (
              configValuesTiers?.[tierId]?.hideTierForUsers ||
              diamondConfigTiers?.[tierId]?.hideTierForUsers
            )?.toString() === 'true',
        };

        if (
          // If tier is intentionally hidden
          tier?.hideTierForUsers ||
          // Or it does not really exist on the contract
          (contractTiers && contractTierIds.length && !contractTiers[tierId])
        ) {
          // ...ignore including the tier
          return acc;
        }

        return {
          ...acc,
          [tierId]: tier,
        };
      }, {}),
    [
      configValuesTiers,
      contractTierIds.length,
      contractTiers,
      diamondConfigTiers,
      tierIds,
    ],
  );
  const currentTierConfig = useMemo(
    () =>
      currentTierId !== undefined ? tiers[currentTierId.toString()] : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTierId],
  );

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
      chainId: Number(chainId.toString()),
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

  const {
    data: rampRequestConfig,
    error: rampRequestConfigError,
    isLoading: rampRequestConfigLoading,
  } = useBalanceRampRequestConfig({
    env,
    rampRequest,
    enabled: Boolean(rampRequest),
  });

  const { data: contractDecimals, isLoading: contractDecimalsLoading } =
    useContractDecimals({
      chainId,
      contractAddress,
    });

  useEffect(() => {
    if (mintCount == undefined) {
      setMintCount('1');
    }
  }, [mintCount]);

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
      overrides?: Partial<PrepareWriteContractConfig['overrides']>,
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
              currentTierId: currentTierId as BigNumberish,
              totalAmount: result.totalAmount,
              mintCount: result.mintCount,
              txReceipt: result.receipt,
              txResponse: result.response,
            });
        }
      }

      await refetchTiers();
    },
    [currentTierId, doMint, onMintSuccess, refetchTiers],
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

  useEffect(() => {
    refetchTiers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    data: {
      env,
      chainId,
      contractAddress,
      contractDecimals:
        contractDecimalsLoading && !contractDecimals
          ? undefined
          : contractDecimals,

      // On-chain values
      tiers,

      // Current tier
      currentTierId,
      currentTierConfig,
      start,
      end,
      price,
      hasAllowlist,
      isActive,
      isAllowlisted,
      eligibleAmount,
      isEligible,

      // Helpers
      autoDetectedTierId,
      mintCount,
      canMint,
      isERC20Payment,
      isApproveNeeded,
      minterAddress: finalMinterAddress,
      rampRequestConfig,

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
      rampRequestConfigLoading,

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
      rampRequestConfigError,

      // Transaction
      approveError,
      mintError,
    },

    refetchTiers,
    setCurrentTierId,
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
