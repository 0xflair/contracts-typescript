import { CoinGeckoProvider } from '@0xflair/react-coingecko';
import { CommonProvider } from '@0xflair/react-common';
import { WalletProvider, WalletProviderProps } from '@0xflair/react-wallet';
import * as React from 'react';

type Props = {
  children?: React.ReactNode;
  walletProviderProps?: WalletProviderProps;
};

export const FlairProvider = (props: Props) => {
  const { children, walletProviderProps } = props;

  return (
    <CommonProvider>
      <CoinGeckoProvider>
        <WalletProvider {...walletProviderProps}>{children}</WalletProvider>
      </CoinGeckoProvider>
    </CommonProvider>
  );
};
