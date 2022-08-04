import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment, useChainInfo } from '@0xflair/react-common';
import {
  NftToken,
  TokenBalance,
  useNftTokens,
  useTokenBalances,
} from '@0xflair/react-data-query';
import { useERC721Symbol } from '@0xflair/react-openzeppelin';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode, useMemo } from 'react';
import { Chain, useAccount, useBalance } from 'wagmi';

import { useStreamTicketToken, useTokenStream } from '../hooks';
import { useStreamTokensInCustody } from '../hooks/useStreamTokensInCustody';
import { TokenStream } from '../types';

type StreamContextValue = {
  data: {
    env?: Environment;

    // Resources
    chainId?: number;
    chainInfo?: Chain;
    contractAddress?: string;
    stream?: TokenStream | null;
    nfts?: NftToken[] | null;

    // On-chain values
    ticketTokenAddress?: BytesLike;
    ticketTokenSymbol?: BytesLike;
    streamNativeBalance?: ReturnType<typeof useBalance>['data'];
    streamERC20Balances?: TokenBalance[] | null;
    tokenIdsInCustody?: BigNumberish[];

    // Helpers
    ticketTokenIds?: BigNumberish[];
  };

  isLoading: {
    // Resources
    streamLoading?: boolean;
    walletNftsLoading?: boolean;

    // On-chain values
    ticketTokenAddressLoading?: boolean;
    ticketTokenSymbolLoading?: boolean;
    streamNativeBalanceLoading?: boolean;
    streamERC20BalancesLoading?: boolean;
  };

  error: {
    // Resources
    streamError?: string | Error | null;
    walletNftsError?: string | Error | null;

    // On-chain values
    ticketTokenAddressError?: string | Error | null;
    ticketTokenSymbolError?: string | Error | null;
    streamNativeBalanceError?: string | Error | null;
    streamERC20BalancesError?: string | Error | null;
  };

  refetchWalletNfts: () => Promise<any>;
  refetchStreamERC20Balances: () => Promise<any>;
};

export const StreamContext = React.createContext<StreamContextValue | null>(
  null,
);

type FunctionalChildren = (
  contextValue: StreamContextValue,
) => ReactNode | ReactNode[];

type Props = {
  /** Environment can be either 'prod' (default) or 'env' */
  env?: Environment;

  /** ChainID where the token stream is deployed */
  chainId: number | string;

  /** Contract address of the token stream */
  contractAddress: string;

  /** Child elements or a factory function that returns child elements */
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const StreamProvider = ({
  env = Environment.PROD,
  chainId: rawChainId,
  contractAddress,
  children,
}: Props) => {
  const chainId = Number(rawChainId);
  const chainInfo = useChainInfo(chainId);
  const { data: account } = useAccount();

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
    data: walletNfts,
    error: walletNftsError,
    isLoading: walletNftsLoading,
    sendRequest: refetchWalletNfts,
  } = useNftTokens({
    env,
    chainId,
    collectionAddress: ticketTokenAddress,
    walletAddress: account?.address,
    enabled: Boolean(account?.address && ticketTokenAddress),
  });

  const {
    data: tokenIdsInCustody,
    error: tokenIdsInCustodyError,
    isLoading: tokenIdsInCustodyLoading,
  } = useStreamTokensInCustody({
    chainId,
    contractAddress,
    ticketTokenAddress,
  });

  const {
    data: ticketTokenSymbol,
    error: ticketTokenSymbolError,
    isLoading: ticketTokenSymbolLoading,
  } = useERC721Symbol({
    chainId,
    contractAddress: ticketTokenAddress,
    enabled: Boolean(ticketTokenAddress),
  });

  const {
    data: streamNativeBalance,
    error: streamNativeBalanceError,
    isLoading: streamNativeBalanceLoading,
  } = useBalance({
    chainId,
    addressOrName: contractAddress,
    enabled: Boolean(contractAddress),
    watch: true,
  });

  const {
    data: streamERC20Balances,
    error: streamERC20BalancesError,
    isLoading: streamERC20BalancesLoading,
    sendRequest: refetchStreamERC20Balances,
  } = useTokenBalances({
    env,
    chainId,
    address: contractAddress,
    enabled: Boolean(contractAddress),
  });

  const nfts = useMemo(() => {
    return [
      ...(walletNfts || []),
      ...(tokenIdsInCustody || []).map(
        (tokenId) =>
          ({
            tokenId,
            contractAddress: ticketTokenAddress,
            ownerAddress: stream?.contractAddress,
          } as NftToken),
      ),
    ];
  }, [
    walletNfts,
    tokenIdsInCustody,
    ticketTokenAddress,
    stream?.contractAddress,
  ]);

  const ticketTokenIds = useMemo(() => {
    return nfts?.map(({ tokenId }) => tokenId) || [];
  }, [nfts]);

  const value = {
    data: {
      env,

      // Resources
      chainId,
      chainInfo,
      contractAddress,
      stream,
      nfts,

      // On-chain values
      ticketTokenAddress,
      ticketTokenSymbol,
      streamNativeBalance,
      streamERC20Balances,
      tokenIdsInCustody,

      // Helpers
      ticketTokenIds,
    },

    isLoading: {
      // Resources
      streamLoading,
      walletNftsLoading,

      // On-chain values
      ticketTokenAddressLoading,
      ticketTokenSymbolLoading,
      streamNativeBalanceLoading,
      streamERC20BalancesLoading,
      tokenIdsInCustodyLoading,
    },

    error: {
      // Resources
      streamError,
      walletNftsError,

      // On-chain values
      ticketTokenAddressError,
      ticketTokenSymbolError,
      streamNativeBalanceError,
      streamERC20BalancesError,
      tokenIdsInCustodyError,
    },

    refetchWalletNfts,
    refetchStreamERC20Balances,
  };

  return React.createElement(
    StreamContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children,
  );
};

export const useStreamContext = () => {
  const context = React.useContext(StreamContext);
  if (!context) throw Error('Must be used within <StreamProvider>');
  return context;
};
