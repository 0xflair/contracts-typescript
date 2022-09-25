import * as React from 'react';

import { CommonProvider } from '../common';
import { CoinGeckoProvider } from '../core/crypto-currency';
import { WalletProvider, WalletProviderProps } from '../core/wallet';

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
