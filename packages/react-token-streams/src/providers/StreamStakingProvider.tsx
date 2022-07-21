import { NftToken } from '@0xflair/react-data-query';
import { useFilterUnlockedTokens } from '@0xflair/react-nft-collections';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish } from 'ethers';
import * as React from 'react';
import { ReactNode } from 'react';
import { useSigner } from 'wagmi';

import { useStreamStaker } from '../hooks/useStreamStaker';
import { useStreamUnlockingTime } from '../hooks/useStreamUnlockingTime';
import { useStreamUnstaker } from '../hooks/useStreamUnstaker';
import { useStreamContext } from './StreamProvider';

export type StreamStakingContextValue = {
  data: {
    // On-chain values
    unlockedNfts?: NftToken[] | null;
    lockedNfts?: NftToken[] | null;
    stakedNfts?: NftToken[] | null;
    unstakeableNfts?: NftToken[] | null;

    // Helpers
    unlockedTokenIds?: BigNumberish[];
    lockedTokenIds?: BigNumberish[];
    canStake?: boolean;
    canUnstake?: boolean;

    // Transaction
    stakeData?: {
      txReceipt?: TransactionReceipt;
      txResponse?: TransactionResponse;
    };
    unstakeData?: {
      txReceipt?: TransactionReceipt;
      txResponse?: TransactionResponse;
    };
  };

  isLoading: {
    // On-chain values
    unlockedNftsLoading?: boolean;
    lockedNftsLoading?: boolean;
    unstakeableNftsLoading?: boolean;
    tokenUnlockingTimesLoading?: boolean;

    // Transaction
    stakeLoading?: boolean;
    unstakeLoading?: boolean;
  };

  error: {
    // On-chain values
    unlockedNftsError?: string | Error | null;
    tokenUnlockingTimesError?: string | Error | null;

    // Transaction
    stakeError?: string | Error | null;
    unstakeError?: string | Error | null;
  };

  stake: ReturnType<typeof useStreamStaker>['writeAndWait'];
  unstake: ReturnType<typeof useStreamUnstaker>['writeAndWait'];
};

export const StreamStakingContext =
  React.createContext<StreamStakingContextValue | null>(null);

type FunctionalChildren = (
  contextValue: StreamStakingContextValue
) => ReactNode | ReactNode[];

type Props = {
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const StreamStakingProvider = ({ children }: Props) => {
  const { data: signer } = useSigner();

  const {
    data: {
      env,
      chainId,
      contractAddress,
      nfts,
      ticketTokenAddress,
      ticketTokenIds,
    },
    isLoading: { nftsLoading },
  } = useStreamContext();

  const {
    data: unlockedTokenIds,
    error: unlockedNftsError,
    isLoading: unlockedNftsLoading,
  } = useFilterUnlockedTokens({
    chainId,
    contractAddress: ticketTokenAddress as string,
    args: [ticketTokenIds || []],
    enabled: Boolean(ticketTokenAddress),
  });

  const unlockedNfts = nfts?.filter((t) =>
    unlockedTokenIds.find((u) => u.toString() === t.tokenId)
  );
  const lockedNfts = nfts?.filter(
    (t) => !unlockedTokenIds.find((u) => u.toString() === t.tokenId)
  );

  const {
    data: tokenUnlockingTimes,
    error: tokenUnlockingTimesError,
    isLoading: tokenUnlockingTimesLoading,
  } = useStreamUnlockingTime({
    chainId,
    contractAddress,
    args: [ticketTokenIds || []],
  });

  const now = Math.floor(+new Date() / 1000);
  const stakedNfts =
    (tokenUnlockingTimes
      ?.map((t, i) => (Number(t.toString()) > 0 ? nfts?.[i] : null))
      .filter((i) => i !== null) as NftToken[]) || [];

  const unstakeableNfts = (tokenUnlockingTimes
    ?.map((t, i) => (Number(t.toString()) < now ? nfts?.[i] : null))
    .filter((t) => t !== null)
    .filter((t) =>
      stakedNfts.find((s) => s.tokenId.toString() === t?.tokenId.toString())
    ) || []) as NftToken[];

  const {
    data: stakeData,
    error: stakeError,
    isLoading: stakeLoading,
    writeAndWait: stake,
  } = useStreamStaker({
    env,
    chainId,
    contractAddress,
    signerOrProvider: signer,
    ticketTokenIds: unlockedNfts?.map((t) => t.tokenId) || [],
  });

  const {
    data: unstakeData,
    error: unstakeError,
    isLoading: unstakeLoading,
    writeAndWait: unstake,
  } = useStreamUnstaker({
    env,
    chainId,
    contractAddress,
    signerOrProvider: signer,
    ticketTokenIds: unstakeableNfts?.map((t) => t.tokenId) || [],
  });

  const canStake = Boolean(
    !nftsLoading &&
      !stakeLoading &&
      !unlockedNftsLoading &&
      unlockedNfts &&
      unlockedNfts.length > 0
  );

  const canUnstake = Boolean(
    !nftsLoading &&
      !unstakeLoading &&
      !tokenUnlockingTimesLoading &&
      unstakeableNfts &&
      unstakeableNfts.length > 0
  );

  const value = {
    data: {
      // On-chain values
      unlockedNfts,
      lockedNfts,
      stakedNfts,
      unstakeableNfts,
      tokenUnlockingTimes,

      // Helpers
      unlockedTokenIds: unlockedNfts?.map((t) => t.tokenId),
      lockedTokenIds: lockedNfts?.map((t) => t.tokenId),
      canStake,
      canUnstake,

      // Transaction
      stakeData,
      unstakeData,
    },

    isLoading: {
      // On-chain values
      unlockedNftsLoading,
      lockedNftsLoading: unlockedNftsLoading,
      unstakeableNftsLoading: tokenUnlockingTimesLoading || unlockedNftsLoading,
      tokenUnlockingTimesLoading,

      // Transaction
      stakeLoading,
      unstakeLoading,
    },

    error: {
      unlockedNftsError,
      tokenUnlockingTimesError,
      stakeError,
      unstakeError,
    },

    stake,
    unstake,
  };

  return React.createElement(
    StreamStakingContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children
  );
};

export const useStreamStakingContext = () => {
  const context = React.useContext(StreamStakingContext);
  if (!context) throw Error('Must be used within <StreamStakingProvider>');
  return context;
};
