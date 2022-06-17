import { Environment } from '@0xflair/react-common';
import { NftToken, useNftTokens } from '@0xflair/react-nft-tokens';
import { useERC20Symbol } from '@0xflair/react-openzeppelin';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { useAccount, useSigner } from 'wagmi';

import {
  useStreamTotalClaimableBulk,
  useStreamTotalClaimedBulk,
  useTokenStream,
} from '../hooks';
import { useStreamClaimer } from '../hooks/useStreamClaimer';
import { TokenStream } from '../types';

type StreamClaimingContextValue = {
  data: {
    // Resources
    chainId?: number;
    contractAddress?: string;
    stream?: TokenStream | null;
    nfts?: NftToken[] | null;
    ticketTokenIds?: BigNumberish[];

    // On-chain values
    claimTokenSymbol?: BytesLike;
    totalClaimedAmount?: BigNumberish;
    totalClaimableAmount?: BigNumberish;

    // Helpers
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
    claimTokenSymbolLoading?: boolean;
    totalClaimedAmountLoading?: boolean;
    totalClaimableAmountLoading?: boolean;

    // Transaction
    claimLoading?: boolean;
  };

  error: {
    // Resources
    streamError?: string | Error | null;
    nftsError?: string | Error | null;

    // On-chain values
    claimTokenSymbolError?: string | Error | null;
    totalClaimedAmountError?: string | Error | null;
    totalClaimableAmountError?: string | Error | null;

    // Transaction
    claimError?: string | Error | null;
  };

  claim: (args?: {
    ticketTokenIds?: BigNumberish | BigNumberish[];
  }) => Promise<any>;
};

export const StreamClaimingContext =
  React.createContext<StreamClaimingContextValue | null>(null);

type Props = {
  /** Environment can be either 'prod' (default) or 'env' */
  env?: Environment;

  /** ChainID where the token stream is deployed */
  chainId: number | string;

  /** Contract address of the token stream */
  contractAddress: string;
};

export const StreamClaimingProvider = ({
  env = Environment.PROD,
  chainId,
  contractAddress,
  children,
}: React.PropsWithChildren<Props>) => {
  const { data: signer } = useSigner();
  const { data: account } = useAccount();

  const {
    data: stream,
    error: streamError,
    isLoading: streamLoading,
  } = useTokenStream({
    env,
    chainId: Number(chainId),
    contractAddress,
  });

  const {
    data: nfts,
    error: nftsError,
    isLoading: nftsLoading,
  } = useNftTokens({
    env,
    chainId: Number(chainId),
    collectionAddress: stream?.config?.ticketToken,
    walletAddress: account?.address,
  });

  const ticketTokenIds = nfts?.map(({ tokenId }) => tokenId);

  const {
    data: claimTokenSymbol,
    error: claimTokenSymbolError,
    isLoading: claimTokenSymbolLoading,
  } = useERC20Symbol({
    chainId: Number(chainId),
    contractAddress: stream?.config?.claimToken,
  });
  const {
    data: totalClaimedAmount,
    error: totalClaimedAmountError,
    isLoading: totalClaimedAmountLoading,
  } = useStreamTotalClaimedBulk({
    chainId: Number(chainId),
    contractAddress,
    ticketTokenIds,
  });
  const {
    data: totalClaimableAmount,
    error: totalClaimableAmountError,
    isLoading: totalClaimableAmountLoading,
  } = useStreamTotalClaimableBulk({
    chainId: Number(chainId),
    contractAddress,
    ticketTokenIds,
  });
  const {
    data: { txReceipt, txResponse },
    error: claimError,
    isLoading: claimLoading,
    claim,
  } = useStreamClaimer({
    contractVersion: stream?.presetVersion,
    contractAddress,
    signerOrProvider: signer,
    ticketTokenIds,
  });

  const canClaim = Boolean(
    !claimLoading &&
      !nftsLoading &&
      totalClaimableAmount &&
      Number(totalClaimableAmount?.toString()) > 0
  );

  const value = {
    data: {
      // Resources
      chainId: Number(chainId),
      contractAddress,
      stream,
      nfts,
      ticketTokenIds,

      // On-chain values
      claimTokenSymbol,
      totalClaimedAmount,
      totalClaimableAmount,

      // Helpers
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
      claimTokenSymbolLoading,
      totalClaimedAmountLoading,
      totalClaimableAmountLoading,

      // Transaction
      claimLoading,
    },

    error: {
      streamError,
      nftsError,
      claimTokenSymbolError,
      totalClaimedAmountError,
      totalClaimableAmountError,
      claimError,
    },

    claim,
  };

  return React.createElement(
    StreamClaimingContext.Provider,
    { value },
    children
  );
};

export const useStreamClaimingContext = () => {
  const context = React.useContext(StreamClaimingContext);
  if (!context) throw Error('Must be used within <StreamClaimingProvider>');
  return context;
};
