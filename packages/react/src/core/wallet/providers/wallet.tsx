import {
  FLAIR_CHAINS,
  MagicLinkConnector,
  SafeConnector,
} from '@flair-sdk/common';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

import { isDarkMode } from '../../../common/utils/dark-mode';
import stylesheet from '../../../index.css';
import { wrapWagmiClient } from '../../balance-ramp';
import { FLAIR_ALCHEMY_API_KEY, FLAIR_INFURA_PROJECT_ID } from '../constants';
import { useAutoConnect } from '../hooks/useAutoConnect';
import { useAutoSwitch } from '../hooks/useAutoSwitch';

export type WalletProviderProps = {
  children?: ReactNode;
  appName?: string;
  preferredChainId?: number;
  custodialWallet?: boolean;
  injectStyles?: boolean;
  wagmiOverrides?: Record<string, any>;
};

const FLAIR_MAGIC_API_KEY = 'pk_live_8B82089A89462668';
const FLAIR_WEB3AUTH_CLIENT_ID =
  'BELgvAxTUr_qKkDF7aS0Q0SxFXHxmAbzIrSRKKogR0e3__F_0GpQNzukF1uX9lWmwi0y1l2b0XBnxWLeLlPg-g4';

const { chains, provider, webSocketProvider } = configureChains(FLAIR_CHAINS, [
  alchemyProvider({
    priority: 10,
    apiKey: FLAIR_ALCHEMY_API_KEY,
  }),
  infuraProvider({
    priority: 50,
    apiKey: FLAIR_INFURA_PROJECT_ID,
  }),
  publicProvider({
    priority: 100,
  }),
]);

const AutoWalletWrapper = ({
  preferredChainId,
  children,
}: PropsWithChildren<any>) => {
  useAutoConnect();
  useAutoSwitch(preferredChainId);

  return <>{children}</>;
};

export const WalletProvider = ({
  children,
  appName = 'Quick Wallet',
  injectStyles = true,
  preferredChainId,
  wagmiOverrides,
}: WalletProviderProps) => {
  const darkMode = isDarkMode();
  const connectors = useCallback(() => {
    const torusPlugin = new TorusWalletConnectorPlugin({
      torusWalletOpts: {
        buttonPosition: 'bottom-left',
      },
      walletInitOptions: {
        whiteLabel: {
          theme: { isDark: isDarkMode(), colors: { primary: '#00a8ff' } },
          logoDark: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
          logoLight: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
        },
        useWalletConnect: true,
        enableLogging: true,
      },
    });

    const connectors: any[] = [
      new MetaMaskConnector({
        chains,
        options: {
          shimDisconnect: true,
          UNSTABLE_shimOnConnectSelectAccount: true,
          shimChainChangedDisconnect: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          shimDisconnect: true,
          shimChainChangedDisconnect: true,
        },
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
          darkMode,
        },
      }),
      new SafeConnector({
        chains,
        options: {
          debug: true,
        },
      }),
      new MagicLinkConnector({
        chains,
        options: {
          apiKey: FLAIR_MAGIC_API_KEY,
          isDarkMode: darkMode,
          oauthOptions: {
            providers: ['google', 'twitter', 'github'],
          },
          customHeaderText: appName,
        },
      }),
      new Web3AuthConnector({
        chains,
        options: {
          network: 'mainnet',
          clientId: FLAIR_WEB3AUTH_CLIENT_ID,
          uiConfig: {
            theme: isDarkMode() ? 'dark' : undefined,
          },
          socialLoginConfig: {
            mfaLevel: 'optional',
          },
          uxMode: 'popup',
          displayErrorsOnModal: true,
        },
      }),
    ];

    connectors
      ?.find((c) => c instanceof Web3AuthConnector)
      ?.web3AuthInstance?.addPlugin?.(torusPlugin);

    return connectors;
  }, [appName, darkMode]);

  const wagmiClient = useMemo(
    () =>
      wrapWagmiClient(
        createClient({
          autoConnect: false,
          connectors,
          provider,
          webSocketProvider,
        }),
      ),
    [connectors],
  );

  useEffect(() => {
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
      <AutoWalletWrapper preferredChainId={preferredChainId}>
        {children}
      </AutoWalletWrapper>
    </WagmiConfig>
  );
};
