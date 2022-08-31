import { Environment, useChainInfo, ZERO_ADDRESS } from '@0xflair/react-common';
import {
  NftToken,
  TokenBalance,
  useNftTokens,
  useTokenBalances,
} from '@0xflair/react-data-query';
import { useERC721Symbol } from '@0xflair/react-openzeppelin';
import { BigNumber, BigNumberish, BytesLike } from 'ethers';
import _ from 'lodash';
import * as React from 'react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Chain, useAccount, useBalance } from 'wagmi';

import { useStreamTicketToken, useTokenStream } from '../hooks';
import { useStreamTokensInCustody } from '../hooks/useStreamTokensInCustody';
import { TokenStream } from '../types';

type StreamContextValue = {
  data: {
    env?: Environment;

    // Resources
    chainId: number;
    chainInfo?: Chain;
    contractAddress?: string;
    stream?: TokenStream;
    ticketTokens?: NftToken[];
    walletAddress?: BytesLike;

    // On-chain values
    ticketTokenAddress?: BytesLike;
    ticketTokenSymbol?: BytesLike;
    streamNativeBalance?: ReturnType<typeof useBalance>['data'];
    streamERC20Balances?: TokenBalance[];
    tokenIdsInCustody?: BigNumberish[];

    // Helpers
    tokenBalances?: TokenBalance[];
    ticketTokenIds?: BigNumberish[];
    selectedTicketTokens?: NftToken[];
    selectedTicketTokenIds?: BigNumberish[];
  };

  error: {
    // Resources
    streamError?: string | Error | null;
    walletNftsError?: string | Error | null;
    tokenIdsInCustodyError?: string | Error | null;

    // On-chain values
    ticketTokenAddressError?: string | Error | null;
    ticketTokenSymbolError?: string | Error | null;
    streamNativeBalanceError?: string | Error | null;
    streamERC20BalancesError?: string | Error | null;
  };

  isLoading: {
    // Resources
    streamLoading?: boolean;
    walletNftsLoading?: boolean;
    tokenIdsInCustodyLoading?: boolean;

    // On-chain values
    ticketTokenAddressLoading?: boolean;
    ticketTokenSymbolLoading?: boolean;
    streamNativeBalanceLoading?: boolean;
    streamERC20BalancesLoading?: boolean;
  };

  refetchTokensInCustody: () => Promise<any>;
  refetchWalletNfts: () => Promise<any>;
  refetchStreamERC20Balances: () => Promise<any>;

  setSelectedTicketTokens: (tokens: NftToken[]) => void;
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

  /** Optional custom wallet address to claim on behalf of */
  walletAddress?: BytesLike;

  /** Child elements or a factory function that returns child elements */
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const StreamProvider = ({
  env = Environment.PROD,
  chainId: rawChainId,
  contractAddress,
  walletAddress,
  children,
}: Props) => {
  const chainId = Number(rawChainId);
  const chainInfo = useChainInfo(chainId);
  const { data: account } = useAccount();

  const [selectedTicketTokens, setSelectedTicketTokens] =
    useState<NftToken[]>();

  const finalWalletAddress = walletAddress?.toString() ?? account?.address;

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
    walletAddress: finalWalletAddress,
    enabled: Boolean(finalWalletAddress && ticketTokenAddress),
  });

  const {
    data: tokenIdsInCustody,
    error: tokenIdsInCustodyError,
    isLoading: tokenIdsInCustodyLoading,
    refetchTokensInCustody,
  } = useStreamTokensInCustody({
    chainId,
    contractAddress,
    ticketTokenAddress,
    walletAddress: finalWalletAddress,
    watch: Boolean(finalWalletAddress && ticketTokenAddress),
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

  const ticketTokens = useMemo(() => {
    return _.uniqBy(
      [
        ...(walletNfts || []),
        ...(tokenIdsInCustody || []).map(
          (tokenId) =>
            ({
              tokenId,
              contractAddress: ticketTokenAddress,
              ownerAddress: stream?.contractAddress,
            } as NftToken),
        ),
      ],
      'tokenId',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    walletNfts,
    tokenIdsInCustody,
    ticketTokenAddress,
    stream?.contractAddress,
    finalWalletAddress,
  ]);

  const tokenBalances = useMemo(() => {
    const tokens: TokenBalance[] = [];
    if (streamNativeBalance && streamNativeBalance.value.gt(0)) {
      tokens.push({
        chainId,
        ownerAddress: contractAddress as string,
        balance: streamNativeBalance.value.toString(),
        tokenAddress: ZERO_ADDRESS,
        decimals: chainInfo?.nativeCurrency?.decimals.toString() || '18',
        symbol: streamNativeBalance.symbol,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        name: chainInfo?.nativeCurrency?.name || streamNativeBalance.symbol,
      });
    }

    tokens.push(
      ...(streamERC20Balances?.filter((token) =>
        BigNumber.from(token.balance).gt(0),
      ) || []),
    );

    return tokens;
  }, [
    streamNativeBalance,
    streamERC20Balances,
    chainId,
    contractAddress,
    chainInfo?.nativeCurrency?.decimals,
    chainInfo?.nativeCurrency?.name,
  ]);

  const ticketTokenIds = useMemo(() => {
    return ticketTokens?.map(({ tokenId }) => tokenId) || [];
  }, [ticketTokens]);

  useEffect(() => {
    if (tokenIdsInCustodyLoading || walletNftsLoading) {
      return;
    }

    if (ticketTokens) {
      setSelectedTicketTokens(ticketTokens);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ticketTokens,
    ticketTokens.length,
    walletAddress,
    account?.address,
    tokenIdsInCustodyLoading,
    walletNftsLoading,
  ]);

  const selectedTicketTokenIds = useMemo(() => {
    return selectedTicketTokens?.map(({ tokenId }) => tokenId) || [];
  }, [selectedTicketTokens]);

  const value = {
    data: {
      env,

      // Resources
      chainId,
      chainInfo,
      contractAddress,
      stream,
      ticketTokens,
      walletAddress: finalWalletAddress,

      // On-chain values
      ticketTokenAddress,
      ticketTokenSymbol,
      streamNativeBalance,
      streamERC20Balances,
      tokenIdsInCustody,

      // Helpers
      tokenBalances,
      ticketTokenIds,
      selectedTicketTokens,
      selectedTicketTokenIds,
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

    refetchTokensInCustody,
    refetchWalletNfts,
    refetchStreamERC20Balances,

    setSelectedTicketTokens,
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
