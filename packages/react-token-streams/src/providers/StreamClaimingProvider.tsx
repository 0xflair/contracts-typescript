import { ZERO_ADDRESS } from '@0xflair/react-common';
import { useERC20Symbol } from '@0xflair/react-openzeppelin';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSigner } from 'wagmi';

import { useStreamClaimableAmount } from '../hooks/useStreamClaimableAmount';
import { useStreamClaimer } from '../hooks/useStreamClaimer';
import { useStreamTotalClaimed } from '../hooks/useStreamTotalClaimed';
import { useStreamTotalSupply } from '../hooks/useStreamTotalSupply';
import { useStreamContext } from './StreamProvider';

export type StreamClaimingContextValue = {
  data: {
    // On-chain values
    totalClaimedAmountByAccount?: BigNumberish;
    totalClaimableAmountByAccount?: BigNumberish;
    totalClaimedAmountOverall?: BigNumberish;
    totalSupplyAmountOverall?: BigNumberish;

    // Helpers
    currentClaimTokenAddress?: BytesLike;
    currentClaimTokenSymbol?: BytesLike;
    canClaim?: boolean;

    // Transaction
    txReceipt?: TransactionReceipt;
    txResponse?: TransactionResponse;
  };

  isLoading: {
    // On-chain values
    totalClaimedAmountByAccountLoading?: boolean;
    totalClaimableAmountByAccountLoading?: boolean;
    totalClaimedOverallLoading?: boolean;
    totalSupplyOverallLoading?: boolean;

    // Transaction
    claimLoading?: boolean;
  };

  error: {
    // On-chain values
    totalClaimedAmountByAccountError?: string | Error | null;
    totalClaimableAmountByAccountError?: string | Error | null;
    totalClaimedOverallError?: string | Error | null;
    totalSupplyOverallError?: string | Error | null;

    // Transaction
    claimError?: string | Error | null;
  };

  setCurrentClaimTokenAddress: (address: BytesLike) => void;
  claim: ReturnType<typeof useStreamClaimer>['writeAndWait'];
};

export const StreamClaimingContext =
  React.createContext<StreamClaimingContextValue | null>(null);

type FunctionalChildren = (
  contextValue: StreamClaimingContextValue,
) => ReactNode | ReactNode[];

type Props = {
  /** Optional primary claim token to use when claiming */
  primaryClaimToken?: BytesLike;

  /** Content to render */
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const StreamClaimingProvider = ({
  primaryClaimToken,
  children,
}: Props) => {
  const { data: signer } = useSigner();
  const [currentClaimTokenAddress, setCurrentClaimTokenAddress] =
    useState<BytesLike>();

  const {
    data: {
      env,
      chainId,
      contractAddress,
      selectedTicketTokens,
      stream,
      streamNativeBalance,
      streamERC20Balances,
      ticketTokenIds,
      selectedTicketTokenIds,
      walletAddress,
    },
    isLoading: {
      walletNftsLoading,
      streamLoading,
      streamERC20BalancesLoading,
      streamNativeBalanceLoading,
    },
  } = useStreamContext();

  const {
    data: currentClaimTokenSymbol,
    error: currentClaimTokenSymbolError,
    isLoading: currentClaimTokenSymbolLoading,
  } = useERC20Symbol({
    chainId: Number(chainId),
    contractAddress: currentClaimTokenAddress?.toString() as string,
    enabled: Boolean(currentClaimTokenAddress),
  });

  const {
    data: totalClaimedAmountByAccount,
    error: totalClaimedAmountByAccountError,
    isLoading: totalClaimedAmountByAccountLoading,
    refetch: refetchTotalClaimedAmountByAccount,
  } = useStreamTotalClaimed({
    chainId,
    contractAddress,
    ticketTokenIds: selectedTicketTokenIds || [],
    claimToken: currentClaimTokenAddress,
  });

  const {
    data: totalClaimedAmountOverall,
    error: totalClaimedAmountOverallError,
    isLoading: totalClaimedAmountOverallLoading,
    refetch: refetchTotalClaimedAmountOverall,
  } = useStreamTotalClaimed({
    chainId,
    contractAddress,
    claimToken: currentClaimTokenAddress,
  });

  const {
    data: totalSupplyAmountOverall,
    error: totalSupplyAmountOverallError,
    isLoading: totalSupplyAmountOverallLoading,
  } = useStreamTotalSupply({
    chainId,
    contractAddress,
    claimToken: currentClaimTokenAddress,
  });

  const {
    data: totalClaimableAmountByAccount,
    error: totalClaimableAmountByAccountError,
    isLoading: totalClaimableAmountByAccountLoading,
    refetch: refetchTotalClaimableAmountByAccount,
  } = useStreamClaimableAmount({
    chainId,
    contractAddress,
    ticketTokenIds: selectedTicketTokenIds,
    claimToken: currentClaimTokenAddress,
    enabled: selectedTicketTokenIds && selectedTicketTokenIds.length > 0,
  });

  const {
    data: { txReceipt, txResponse },
    error: claimError,
    isLoading: claimLoading,
    writeAndWait: doClaim,
  } = useStreamClaimer({
    env,
    chainId,
    contractAddress,
    signerOrProvider: signer,
    ticketTokenIds: selectedTicketTokenIds,
    claimToken: currentClaimTokenAddress,
    owner: walletAddress,
  });

  useEffect(() => {
    if (
      currentClaimTokenAddress !== undefined ||
      streamLoading ||
      streamERC20BalancesLoading ||
      streamNativeBalanceLoading
    ) {
      return;
    }

    const address =
      primaryClaimToken ||
      stream?.config?.primaryClaimToken ||
      (streamNativeBalance?.value?.gt(0)
        ? ZERO_ADDRESS
        : streamERC20Balances?.[0]?.tokenAddress) ||
      ZERO_ADDRESS;

    setCurrentClaimTokenAddress(address);
  }, [
    currentClaimTokenAddress,
    primaryClaimToken,
    stream,
    stream?.config?.primaryClaimToken,
    streamERC20Balances,
    streamERC20BalancesLoading,
    streamLoading,
    streamNativeBalance,
    streamNativeBalance?.value,
    streamNativeBalanceLoading,
  ]);

  const canClaim = Boolean(
    !claimLoading &&
      (!walletNftsLoading || selectedTicketTokens !== undefined) &&
      totalClaimableAmountByAccount &&
      Number(totalClaimableAmountByAccount?.toString()) > 0,
  );

  const claim = useCallback(
    async (args?: {
      ticketTokenIds?: BigNumberish | BigNumberish[];
      claimToken?: BytesLike;
      owner?: BytesLike;
    }) => {
      const result = await doClaim(args);

      refetchTotalClaimedAmountByAccount();
      refetchTotalClaimedAmountOverall();
      refetchTotalClaimableAmountByAccount();

      return result;
    },
    [
      doClaim,
      refetchTotalClaimableAmountByAccount,
      refetchTotalClaimedAmountByAccount,
      refetchTotalClaimedAmountOverall,
    ],
  );

  const value = {
    data: {
      // On-chain values
      totalClaimedAmountByAccount,
      totalClaimableAmountByAccount,
      totalClaimedAmountOverall,
      totalSupplyAmountOverall,

      // Helpers
      ticketTokenIds,
      currentClaimTokenAddress: currentClaimTokenAddress,
      currentClaimTokenSymbol,
      canClaim,

      // Transaction
      txReceipt,
      txResponse,
    },

    isLoading: {
      // On-chain values
      totalClaimedAmountByAccountLoading,
      totalClaimableAmountByAccountLoading,
      totalClaimedAmountOverallLoading,
      totalSupplyAmountOverallLoading,
      currentClaimTokenSymbolLoading,

      // Transaction
      claimLoading,
    },

    error: {
      totalClaimedAmountByAccountError,
      totalClaimableAmountByAccountError,
      totalClaimedAmountOverallError,
      totalSupplyAmountOverallError,
      currentClaimTokenSymbolError,
      claimError,
    },

    setCurrentClaimTokenAddress,
    claim,
  };

  return React.createElement(
    StreamClaimingContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children,
  );
};

export const useStreamClaimingContext = () => {
  const context = React.useContext(StreamClaimingContext);
  if (!context) throw Error('Must be used within <StreamClaimingProvider>');
  return context;
};
