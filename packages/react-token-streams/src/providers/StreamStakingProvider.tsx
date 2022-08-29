import { useHasAnyOfFeatures } from '@0xflair/react-common';
import { NftToken } from '@0xflair/react-data-query';
import { useFilterUnlockedTokens } from '@0xflair/react-nft-collections';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish } from 'ethers';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useBlockNumber, useSigner } from 'wagmi';

import { useStreamStaker } from '../hooks/useStreamStaker';
import { useStreamStakerPrepare } from '../hooks/useStreamStakerPrepare';
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
    needsPrepare?: boolean;

    // Transaction
    prepareData?: {
      txReceipt?: TransactionReceipt;
      txResponse?: TransactionResponse;
    };
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
    prepareLoading?: boolean;

    // Transaction
    stakeLoading?: boolean;
    unstakeLoading?: boolean;
  };

  error: {
    // On-chain values
    unlockedNftsError?: string | Error | null;
    tokenUnlockingTimesError?: string | Error | null;
    prepareError?: string | Error | null;

    // Transaction
    stakeError?: string | Error | null;
    unstakeError?: string | Error | null;
  };

  prepare: ReturnType<typeof useStreamStakerPrepare>['prepare'];
  stake: ReturnType<typeof useStreamStaker>['writeAndWait'];
  unstake: ReturnType<typeof useStreamUnstaker>['writeAndWait'];
};

export const StreamStakingContext =
  React.createContext<StreamStakingContextValue | null>(null);

type FunctionalChildren = (
  contextValue: StreamStakingContextValue,
) => ReactNode | ReactNode[];

type Props = {
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const StreamStakingProvider = ({ children }: Props) => {
  const { data: signer } = useSigner();
  const { data: blockNumber } = useBlockNumber();

  const {
    data: {
      env,
      chainId,
      contractAddress,
      selectedTicketTokens,
      ticketTokenAddress,
      selectedTicketTokenIds,
      tokenIdsInCustody,
    },
    isLoading: { walletNftsLoading, tokenIdsInCustodyLoading },
    refetchWalletNfts,
    refetchTokensInCustody,
  } = useStreamContext();

  const { data: hasLockableExtension } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress: ticketTokenAddress,
    tags: [
      'erc721_lockable_extension',
      'lock_single_token',
      'unlock_single_token',
    ],
  });

  const {
    data: unlockedTokenIds,
    error: unlockedNftsError,
    isLoading: unlockedNftsLoading,
  } = useFilterUnlockedTokens({
    chainId,
    contractAddress: ticketTokenAddress as string,
    args: [selectedTicketTokenIds || []],
    enabled: Boolean(
      hasLockableExtension &&
        ticketTokenAddress &&
        selectedTicketTokenIds &&
        selectedTicketTokenIds.length > 0,
    ),
    watch: Boolean(
      hasLockableExtension &&
        ticketTokenAddress &&
        selectedTicketTokenIds &&
        selectedTicketTokenIds.length > 0,
    ),
  });

  const unlockedNfts = useMemo(
    () =>
      selectedTicketTokens?.filter(
        (t) =>
          (!hasLockableExtension ||
            unlockedTokenIds.find(
              (u: any) => u.toString() === t.tokenId?.toString(),
            )) &&
          !tokenIdsInCustody?.find(
            (id: any) => id.toString() === t.tokenId?.toString(),
          ),
      ),
    [
      hasLockableExtension,
      selectedTicketTokens,
      tokenIdsInCustody,
      unlockedTokenIds,
    ],
  );
  const lockedNfts = useMemo(
    () =>
      selectedTicketTokens?.filter(
        (t) => !unlockedTokenIds.find((id: any) => id.toString() === t.tokenId),
      ),
    [selectedTicketTokens, unlockedTokenIds],
  );

  const {
    data: tokenUnlockingTimes,
    error: tokenUnlockingTimesError,
    isLoading: tokenUnlockingTimesLoading,
    refetch: fetchTokenUnlockingTimes,
  } = useStreamUnlockingTime({
    chainId,
    contractAddress,
    args: [selectedTicketTokenIds || []],
  });

  const now = Math.floor(+new Date() / 1000);
  const stakedNfts = useMemo(
    () =>
      (tokenUnlockingTimes
        ?.map((t, i) =>
          Number(t.toString()) > 0 ? selectedTicketTokens?.[i] : null,
        )
        .filter((i) => i !== null) as NftToken[]) || [],
    [selectedTicketTokens, tokenUnlockingTimes],
  );

  const unstakeableNfts = useMemo(
    () =>
      (tokenUnlockingTimes
        ?.map((t, i) =>
          Number(t.toString()) < now ? selectedTicketTokens?.[i] : null,
        )
        .filter((t) => t !== null)
        .filter((t) =>
          stakedNfts.find(
            (s) => s.tokenId.toString() === t?.tokenId.toString(),
          ),
        ) || []) as NftToken[],
    [selectedTicketTokens, now, stakedNfts, tokenUnlockingTimes],
  );

  const {
    data: {
      needsPrepare,
      txReceipt: prepareTxReceipt,
      txResponse: prepareTxResponse,
    },
    error: prepareError,
    isLoading: prepareLoading,
    prepare,
  } = useStreamStakerPrepare({
    env,
    chainId,
    streamContractAddress: contractAddress,
    ticketTokenAddress: ticketTokenAddress as string,
    signerOrProvider: signer,
  });

  const {
    data: stakeData,
    error: stakeError,
    isLoading: stakeLoading,
    writeAndWait: stakeWriteAndWait,
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
    writeAndWait: unstakeWriteAndWait,
  } = useStreamUnstaker({
    env,
    chainId,
    contractAddress,
    signerOrProvider: signer,
    ticketTokenIds: unstakeableNfts?.map((t) => t.tokenId) || [],
  });

  const canStake = Boolean(
    (!walletNftsLoading || selectedTicketTokens !== undefined) &&
      !tokenIdsInCustodyLoading &&
      !stakeLoading &&
      !unlockedNftsLoading &&
      unlockedNfts &&
      unlockedNfts.length > 0,
  );

  const canUnstake = Boolean(
    (!walletNftsLoading || selectedTicketTokens !== undefined) &&
      !tokenIdsInCustodyLoading &&
      !unstakeLoading &&
      !tokenUnlockingTimesLoading &&
      unstakeableNfts &&
      unstakeableNfts.length > 0,
  );

  useEffect(() => {
    if (walletNftsLoading) {
      return;
    }

    refetchWalletNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  const stake = useCallback(
    () =>
      stakeWriteAndWait().then((result) =>
        refetchTokensInCustody().then(() =>
          fetchTokenUnlockingTimes().then(() =>
            refetchWalletNfts().then(() => result),
          ),
        ),
      ),
    [
      fetchTokenUnlockingTimes,
      refetchTokensInCustody,
      refetchWalletNfts,
      stakeWriteAndWait,
    ],
  );

  const unstake = useCallback(
    () =>
      unstakeWriteAndWait().then((result) =>
        refetchTokensInCustody().then(() =>
          fetchTokenUnlockingTimes().then(() =>
            refetchWalletNfts().then(() => result),
          ),
        ),
      ),
    [
      fetchTokenUnlockingTimes,
      refetchTokensInCustody,
      refetchWalletNfts,
      unstakeWriteAndWait,
    ],
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
      needsPrepare,

      // Transaction
      prepareData: {
        txReceipt: prepareTxReceipt,
        txResponse: prepareTxResponse,
      },
      stakeData,
      unstakeData,
    },

    error: {
      // On-chain values
      unlockedNftsError,
      tokenUnlockingTimesError,

      // Transaction
      prepareError,
      stakeError,
      unstakeError,
    },

    isLoading: {
      // On-chain values
      unlockedNftsLoading,
      lockedNftsLoading: unlockedNftsLoading,
      unstakeableNftsLoading: tokenUnlockingTimesLoading || unlockedNftsLoading,
      tokenUnlockingTimesLoading,

      // Transaction
      prepareLoading,
      stakeLoading,
      unstakeLoading,
    },

    prepare,
    stake,
    unstake,
  };

  return React.createElement(
    StreamStakingContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children,
  );
};

export const useStreamStakingContext = () => {
  const context = React.useContext(StreamStakingContext);
  if (!context) throw Error('Must be used within <StreamStakingProvider>');
  return context;
};
