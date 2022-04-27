import { CoinGeckoProvider } from '@0xflair/react-coingecko';
import { WalletProvider } from '@0xflair/react-wallet';
import * as React from 'react';

type Props = {
  children?: React.ReactNode;
  wagmiOverrides?: Record<string, any>;
};

export const FlairProvider = (props: Props) => {
  const { children, wagmiOverrides } = props;

  return (
    <CoinGeckoProvider>
      <WalletProvider wagmiOverrides={wagmiOverrides}>
        {children}
      </WalletProvider>
    </CoinGeckoProvider>
  );
};
