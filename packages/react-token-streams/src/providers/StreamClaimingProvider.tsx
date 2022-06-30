import { Environment, useChainId, ZERO_ADDRESS } from '@0xflair/react-common';
import {
  NftToken,
  TokenBalance,
  useNftTokens,
  useTokenBalances,
} from '@0xflair/react-data-query';
import { useERC20Symbol } from '@0xflair/react-openzeppelin';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode } from 'react';
import { useAccount, useBalance, useSigner } from 'wagmi';

import { useStreamClaimableAmount } from '../hooks/useStreamClaimableAmount';
import { useStreamClaimer } from '../hooks/useStreamClaimer';
import { useStreamTicketToken } from '../hooks/useStreamTicketToken';
import { useStreamTotalClaimed } from '../hooks/useStreamTotalClaimed';
import { useStreamTotalSupply } from '../hooks/useStreamTotalSupply';
import { useTokenStream } from '../hooks/useTokenStream';
import { TokenStream } from '../types';

export type StreamClaimingContextValue = {
  data: {
    // Config
    env?: Environment;
    chainId?: number;
    contractAddress?: string;

    // Resources
    stream?: TokenStream | null;
    nfts?: NftToken[] | null;
    streamBalances?: TokenBalance[] | null;
    ticketToken?: BytesLike;

    // On-chain values
    totalClaimedAmountByAccount?: BigNumberish;
    totalClaimableAmountByAccount?: BigNumberish;
    totalClaimedAmountOverall?: BigNumberish;
    totalSupplyAmountOverall?: BigNumberish;

    // Helpers
    ticketTokenIds?: BigNumberish[];
    currentClaimTokenAddress?: BytesLike;
    currentClaimTokenSymbol?: BytesLike;
    canClaim?: boolean;

    // Transaction
    txReceipt?: TransactionReceipt;
    txResponse?: TransactionResponse;
  };

  isLoading: {
    // Resources
    nftsLoading?: boolean;
    streamLoading?: boolean;

    // On-chain values
    totalClaimedAmountByAccountLoading?: boolean;
    totalClaimableAmountByAccountLoading?: boolean;
    totalClaimedOverallLoading?: boolean;
    totalSupplyOverallLoading?: boolean;

    // Transaction
    claimLoading?: boolean;
  };

  error: {
    // Resources
    streamError?: string | Error | null;
    nftsError?: string | Error | null;

    // On-chain values
    totalClaimedAmountByAccountError?: string | Error | null;
    totalClaimableAmountByAccountError?: string | Error | null;
    totalClaimedOverallError?: string | Error | null;
    totalSupplyOverallError?: string | Error | null;

    // Transaction
    claimError?: string | Error | null;
  };

  claim: ReturnType<typeof useStreamClaimer>['writeAndWait'];
};

export const StreamClaimingContext =
  React.createContext<StreamClaimingContextValue | null>(null);

type FunctionalChildren = (
  contextValue: StreamClaimingContextValue
) => ReactNode | ReactNode[];

type Props = {
  /** Environment can be either 'prod' (default) or 'env' */
  env?: Environment;

  /** ChainID where the token stream is deployed */
  chainId: number | string;

  /** Contract address of the token stream */
  contractAddress: string;

  /** Optional primary claim token to use when claiming */
  primaryClaimToken?: string;

  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const StreamClaimingProvider = ({
  env = Environment.PROD,
  chainId: chainId_,
  contractAddress,
  children,
}: Props) => {
  const { data: signer } = useSigner();
  const { data: account } = useAccount();

  const chainId = useChainId(Number(chainId_));

  const {
    data: stream,
    error: streamError,
    isLoading: streamLoading,
  } = useTokenStream({
    env,
    chainId,
    contractAddress,
  });

  const {
    data: ticketTokenAddress_,
    error: ticketTokenAddressError,
    isLoading: ticketTokenAddressLoading,
  } = useStreamTicketToken({
    env,
    chainId,
    contractAddress,
  });

  const ticketTokenAddress =
    ticketTokenAddress_?.toString() || stream?.config?.ticketToken || '';

  const {
    data: nfts,
    error: nftsError,
    isLoading: nftsLoading,
  } = useNftTokens({
    env,
    chainId,
    collectionAddress: ticketTokenAddress,
    walletAddress: account?.address,
    enabled: Boolean(account?.address && ticketTokenAddress),
  });
  const {
    data: streamNativeBalance,
    error: streamNativeBalanceError,
    isLoading: streamNativeBalanceLoading,
  } = useBalance({
    chainId,
    addressOrName: contractAddress,
  });
  const {
    data: streamERC20Balances,
    error: streamERC20BalancesError,
    isLoading: streamERC20BalancesLoading,
  } = useTokenBalances({
    env,
    chainId,
    address: contractAddress,
  });

  const currentClaimTokenAddress =
    stream?.config?.primaryClaimToken ||
    (streamNativeBalance?.value?.gt(0)
      ? ZERO_ADDRESS
      : streamERC20Balances?.[0].tokenAddress) ||
    ZERO_ADDRESS;
  const ticketTokenIds = nfts?.map(({ tokenId }) => tokenId);

  const {
    data: currentClaimTokenSymbol,
    error: currentClaimTokenSymbolError,
    isLoading: currentClaimTokenSymbolLoading,
  } = useERC20Symbol({
    chainId: Number(chainId),
    contractAddress: currentClaimTokenAddress,
  });
  const {
    data: totalClaimedAmountByAccount,
    error: totalClaimedAmountByAccountError,
    isLoading: totalClaimedAmountByAccountLoading,
  } = useStreamTotalClaimed({
    chainId,
    contractAddress,
    ticketTokenIds: ticketTokenIds || [],
    claimToken: currentClaimTokenAddress,
  });
  const {
    data: totalClaimedAmountOverall,
    error: totalClaimedAmountOverallError,
    isLoading: totalClaimedAmountOverallLoading,
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
  } = useStreamClaimableAmount({
    chainId,
    contractAddress,
    ticketTokenIds,
    claimToken: currentClaimTokenAddress,
    enabled: ticketTokenIds && ticketTokenIds.length > 0,
  });
  const {
    data: { txReceipt, txResponse },
    error: claimError,
    isLoading: claimLoading,
    writeAndWait: claim,
  } = useStreamClaimer({
    env,
    chainId,
    contractAddress,
    signerOrProvider: signer,
    ticketTokenIds,
    claimToken: currentClaimTokenAddress,
  });

  const canClaim = Boolean(
    !claimLoading &&
      !nftsLoading &&
      totalClaimableAmountByAccount &&
      Number(totalClaimableAmountByAccount?.toString()) > 0
  );

  const value = {
    data: {
      // Config
      env,
      chainId,
      contractAddress,

      // Resources
      stream,
      nfts,
      streamBalances: streamERC20Balances,

      // On-chain values
      totalClaimedAmountByAccount,
      totalClaimableAmountByAccount,
      totalClaimedAmountOverall,
      totalSupplyAmountOverall,

      // Helpers
      ticketTokenAddress,
      ticketTokenIds,
      currentClaimTokenAddress: currentClaimTokenAddress,
      currentClaimTokenSymbol,
      canClaim,

      // Transaction
      txReceipt,
      txResponse,
    },

    isLoading: {
      // Resources
      nftsLoading,
      streamLoading,

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
      streamError,
      nftsError,
      totalClaimedAmountByAccountError,
      totalClaimableAmountByAccountError,
      totalClaimedAmountOverallError,
      totalSupplyAmountOverallError,
      currentClaimTokenSymbolError,
      claimError,
    },

    claim,
  };

  return React.createElement(
    StreamClaimingContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children
  );
};

export const useStreamClaimingContext = () => {
  const context = React.useContext(StreamClaimingContext);
  if (!context) throw Error('Must be used within <StreamClaimingProvider>');
  return context;
};
