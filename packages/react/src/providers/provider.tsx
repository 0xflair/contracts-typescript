import * as React from 'react';

import { CommonProvider } from '../common';
import { CoinGeckoProvider } from '../core/crypto-currency';
import { WalletProvider, WalletProviderProps } from '../core/wallet';
import {
  SignInProvider,
  SignInProviderProps,
} from '../core/wallet/providers/sign-in';

type Props = {
  children?: React.ReactNode;
  wallet?: WalletProviderProps;
  signIn?: SignInProviderProps;
};

export const FlairProvider = (props: Props) => {
  const { children, wallet, signIn } = props;

  return (
    <CommonProvider>
      <CoinGeckoProvider>
        <WalletProvider {...wallet}>
          <SignInProvider {...signIn}>{children}</SignInProvider>
        </WalletProvider>
      </CoinGeckoProvider>
    </CommonProvider>
  );
};
