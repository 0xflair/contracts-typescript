import { CoinGeckoProvider } from '@0xflair/react-coingecko';
import { CommonProvider } from '@0xflair/react-common';
import { WalletProvider } from '@0xflair/react-wallet';
import * as React from 'react';

type Props = {
  children?: React.ReactNode;
  custodialWallet?: boolean;
  wagmiOverrides?: Record<string, any>;
};

export const FlairProvider = (props: Props) => {
  const { children, custodialWallet, wagmiOverrides } = props;

  return (
    <CommonProvider>
      <CoinGeckoProvider>
        <WalletProvider
          custodialWallet={custodialWallet}
          wagmiOverrides={wagmiOverrides}
        >
          {children}
        </WalletProvider>
      </CoinGeckoProvider>
    </CommonProvider>
  );
};
