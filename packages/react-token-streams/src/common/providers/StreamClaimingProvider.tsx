import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import { NftToken, useNftTokens } from '@0xflair/react-nft-tokens';
import { useERC20Symbol } from '@0xflair/react-openzeppelin';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { useAccount, useSigner } from 'wagmi';

import {
  useStreamTotalClaimable,
  useStreamTotalClaimedByTokenIds,
  useStreamTotalClaimedOverall,
  useTokenStream,
} from '../hooks';
import { useStreamClaimer } from '../hooks/useStreamClaimer';
import { TokenStream } from '../types';

export type StreamClaimingContextValue = {
  data: {
    // Resources
    chainId?: number;
    contractAddress?: string;
    stream?: TokenStream | null;
    nfts?: NftToken[] | null;
    ticketTokenIds?: BigNumberish[];

    // On-chain values
    claimTokenSymbol?: BytesLike;
    totalClaimedAmountByAccount?: BigNumberish;
    totalClaimableAmountByAccount?: BigNumberish;
    totalClaimedAmountOverall?: BigNumberish;

    // Helpers
    canClaim?: boolean;
    contractVersion?: ContractVersion;

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
    totalClaimedAmountByAccountLoading?: boolean;
    totalClaimableAmountByAccountLoading?: boolean;
    totalClaimedOverallLoading?: boolean;

    // Transaction
    claimLoading?: boolean;
  };

  error: {
    // Resources
    streamError?: string | Error | null;
    nftsError?: string | Error | null;

    // On-chain values
    claimTokenSymbolError?: string | Error | null;
    totalClaimedAmountByAccountError?: string | Error | null;
    totalClaimableAmountByAccountError?: string | Error | null;
    totalClaimedOverallError?: string | Error | null;

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

  /** Optional contract version which defaults to stored value on backend, and falls back to latest */
  contractVersion?: ContractVersion;
};

export const StreamClaimingProvider = ({
  env = Environment.PROD,
  chainId,
  contractAddress,
  contractVersion,
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
    data: totalClaimedAmountByAccount,
    error: totalClaimedAmountByAccountError,
    isLoading: totalClaimedAmountByAccountLoading,
  } = useStreamTotalClaimedByTokenIds({
    chainId: Number(chainId),
    contractAddress,
    contractVersion: contractVersion || stream?.presetVersion,
    ticketTokenIds,
    enabled: ticketTokenIds && ticketTokenIds.length > 0,
  });
  const {
    data: totalClaimedAmountOverall,
    error: totalClaimedAmountOverallError,
    isLoading: totalClaimedAmountOverallLoading,
  } = useStreamTotalClaimedOverall({
    chainId: Number(chainId),
    contractAddress,
    contractVersion: contractVersion || stream?.presetVersion,
  });
  const {
    data: totalClaimableAmountByAccount,
    error: totalClaimableAmountByAccountError,
    isLoading: totalClaimableAmountByAccountLoading,
  } = useStreamTotalClaimable({
    chainId: Number(chainId),
    contractAddress,
    contractVersion: contractVersion || stream?.presetVersion,
    ticketTokenIds,
    enabled: ticketTokenIds && ticketTokenIds.length > 0,
  });
  const {
    data: { txReceipt, txResponse },
    error: claimError,
    isLoading: claimLoading,
    claim,
  } = useStreamClaimer({
    contractAddress,
    contractVersion: contractVersion || stream?.presetVersion,
    signerOrProvider: signer,
    ticketTokenIds,
  });

  const canClaim = Boolean(
    !claimLoading &&
      !nftsLoading &&
      totalClaimableAmountByAccount &&
      Number(totalClaimableAmountByAccount?.toString()) > 0
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
      totalClaimedAmountByAccount,
      totalClaimableAmountByAccount,
      totalClaimedAmountOverall,

      // Helpers
      canClaim,
      contractVersion: contractVersion || stream?.presetVersion,

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
      totalClaimedAmountByAccountLoading,
      totalClaimableAmountByAccountLoading,
      totalClaimedAmountOverallError,

      // Transaction
      claimLoading,
    },

    error: {
      streamError,
      nftsError,
      claimTokenSymbolError,
      totalClaimedAmountByAccountError,
      totalClaimableAmountByAccountError,
      totalClaimedAmountOverallLoading,
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
