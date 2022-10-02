import {
  FLAIR_CHAINS,
  MagicLinkConnector,
  SafeConnector,
} from '@flair-sdk/common';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

import stylesheet from '../../../index.css';
import { FLAIR_ALCHEMY_API_KEY, FLAIR_INFURA_PROJECT_ID } from '../constants';
import { useAutoConnect } from '../hooks/useAutoConnect';

export type WalletProviderProps = {
  children?: ReactNode;
  appName?: string;
  custodialWallet?: boolean;
  injectStyles?: boolean;
  wagmiOverrides?: Record<string, any>;
};

const FLAIR_MAGIC_API_KEY = 'pk_live_8B82089A89462668';

const { chains, provider, webSocketProvider } = configureChains(FLAIR_CHAINS, [
  publicProvider(),
  alchemyProvider({
    apiKey: FLAIR_ALCHEMY_API_KEY,
  }),
  infuraProvider({
    apiKey: FLAIR_INFURA_PROJECT_ID,
  }),
]);

const AutoConnectWrapper = ({ children }: PropsWithChildren<any>) => {
  useAutoConnect();

  return <>{children}</>;
};

export const WalletProvider = ({
  children,
  appName = 'Flair',
  custodialWallet = false,
  injectStyles = true,
  wagmiOverrides,
}: WalletProviderProps) => {
  const connectors = useCallback(() => {
    const connectors: any[] = [
      new MetaMaskConnector({ chains }),
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
        },
      }),
      new SafeConnector({
        chains,
        options: {
          debug: true,
        },
      }),
    ];

    if (custodialWallet) {
      connectors.push(
        new MagicLinkConnector({
          chains,
          options: {
            apiKey: FLAIR_MAGIC_API_KEY,
            oauthOptions: {
              providers: ['google', 'twitter', 'github'],
            },
            customHeaderText: appName,
          },
        }),
      );
    }

    return connectors;
  }, [appName, custodialWallet]);

  const wagmiClient = useMemo(
    () =>
      createClient({
        autoConnect: false,
        connectors,
        provider,
        webSocketProvider,
      }),
    [connectors],
  );

  useLayoutEffect(() => {
    if (!injectStyles) {
      return;
    }

    let style = document.getElementById('flair-wallet-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'flair-wallet-styles';
      document.head.appendChild(style);
    }
    style.innerHTML = stylesheet;
  }, [injectStyles]);

  return (
    <WagmiConfig client={wagmiClient} {...wagmiOverrides}>
      <AutoConnectWrapper>{children}</AutoConnectWrapper>
    </WagmiConfig>
  );
};
