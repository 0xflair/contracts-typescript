import { CoinGeckoProvider } from '@0xflair/react-coingecko';
import { WalletProvider } from '@0xflair/react-wallet';
import * as React from 'react';

type Config = {
  appName?: string;
  infuraId?: string;
};

type Props = Config & {
  children?: React.ReactNode;
  wagmiOverrides?: Record<string, any>;
};

export const FlairProvider = (props: Props) => {
  const { children, appName, infuraId, wagmiOverrides } = props;

  return (
    <CoinGeckoProvider>
      <WalletProvider
        appName={appName}
        infuraId={infuraId}
        wagmiOverrides={wagmiOverrides}
      >
        {children}
      </WalletProvider>
    </CoinGeckoProvider>
  );
};
