import { FLAIR_CHAINS } from '@flair-sdk/common';
import {
  MagicLinkConnector,
  SafeConnector,
  SequenceConnector,
  Web3AuthModalConnector,
  Web3OnboardBinanceConnector,
  Web3OnboardBraveConnector,
  Web3OnboardGamestopConnector,
  Web3OnboardLedgerConnector,
  Web3OnboardPortisConnector,
  Web3OnboardTrustConnector,
} from '@flair-sdk/connectors';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { hexlify } from 'ethers/lib/utils';
import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

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
  tryAutoConnect?: boolean;
};

const FLAIR_MAGIC_API_KEY = 'pk_live_8B82089A89462668';
const FLAIR_WEB3AUTH_CLIENT_ID =
  'BELgvAxTUr_qKkDF7aS0Q0SxFXHxmAbzIrSRKKogR0e3__F_0GpQNzukF1uX9lWmwi0y1l2b0XBnxWLeLlPg-g4';

const {
  chains,
  provider: wagmiProvider,
  webSocketProvider,
} = configureChains(FLAIR_CHAINS, [
  alchemyProvider({
    priority: 10,
    apiKey: FLAIR_ALCHEMY_API_KEY,
  }),
  infuraProvider({
    priority: 50,
    apiKey: FLAIR_INFURA_PROJECT_ID,
  }),
  jsonRpcProvider({
    rpc: (chain) => {
      if (chain.rpcUrls.alchemy || chain.rpcUrls.infura) {
        return null;
      }

      return { http: chain.rpcUrls.default };
    },
  }),
]);

const WalletAutomationWrapper = ({
  tryAutoConnect,
  preferredChainId,
  children,
}: PropsWithChildren<any>) => {
  useAutoConnect(tryAutoConnect);
  useAutoSwitch(preferredChainId);

  return <>{children}</>;
};

type LoginContextValue = {
  state: {
    preferredChainId: number;
    allowedNetworks: AllowedNetworks;
  };
  setPreferredChainId: (chainId: number) => void;
  setAllowedNetworks: (allowedNetworks: AllowedNetworks) => void;
};

export const WalletContext = React.createContext<LoginContextValue | null>(
  null,
);

export type AllowedNetworks = 'ALL' | number[];

export const WalletProvider = ({
  children,
  appName = 'Quick Wallet',
  injectStyles = true,
  tryAutoConnect = true,
  preferredChainId: preferredChainId_,
  wagmiOverrides,
}: WalletProviderProps) => {
  const darkMode = isDarkMode();

  const [preferredChainId, setPreferredChainId] = useState<number>(
    preferredChainId_ || 1,
  );
  const [allowedNetworks, setAllowedNetworks] =
    useState<AllowedNetworks>('ALL');

  const connectors = useCallback(() => {
    const preferredChain = chains.find(
      (chain) => chain.id === preferredChainId,
    );

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
        network: preferredChain
          ? {
              host: preferredChain.rpcUrls.default,
              chainId: preferredChain.id,
              blockExplorer: preferredChain.blockExplorers?.default.url,
              networkName: preferredChain.name,
              ticker: preferredChain.nativeCurrency?.symbol,
              tickerName: preferredChain.nativeCurrency?.name,
            }
          : undefined,
      },
    });

    const web3OnboardOptions = {
      appName,
      appLogo: 'https://app.flair.dev/logo-light-filled.png',
    };

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
            providers: ['google', 'twitter', 'github', 'twitch', 'discord'],
          },
          customHeaderText: appName,
        },
      }),
      new Web3AuthModalConnector({
        chains,
        options: {
          network: 'cyan',
          clientId: FLAIR_WEB3AUTH_CLIENT_ID,
          uiConfig: {
            theme: isDarkMode() ? 'dark' : undefined,
          },
          socialLoginConfig: {
            mfaLevel: 'optional',
          },
          uxMode: 'popup',
          displayErrorsOnModal: true,
          chainId: hexlify(preferredChainId).toString(),
        },
      }),
      new SequenceConnector({
        chains: chains as any,
        options: {
          connect: {
            app: appName,
            networkId: preferredChainId,
          },
        },
      }),
      new Web3OnboardBinanceConnector({
        chains,
        options: web3OnboardOptions,
      }),
      new Web3OnboardBraveConnector({
        chains,
        options: web3OnboardOptions,
      }),
      new Web3OnboardGamestopConnector({
        chains,
        options: web3OnboardOptions,
      }),
      new Web3OnboardTrustConnector({
        chains,
        options: web3OnboardOptions,
      }),
      new Web3OnboardPortisConnector({
        chains,
        options: {
          appName,
          appLogo: 'https://app.flair.dev/logo-light-filled.png',
        },
      }),
      new Web3OnboardLedgerConnector({
        chains,
        options: {
          appName,
          appLogo: 'https://app.flair.dev/logo-light-filled.png',
        },
      }),
    ];

    connectors
      ?.find((c) => c instanceof Web3AuthConnector)
      ?.web3AuthInstance?.addPlugin?.(torusPlugin);

    return connectors;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appName, darkMode, preferredChainId]);

  const wagmiClient = useMemo(() => {
    return wrapWagmiClient(
      createClient({
        autoConnect: true,
        connectors,
        provider: wagmiProvider,
        webSocketProvider,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectors]);

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

  const value = {
    state: {
      preferredChainId,
      allowedNetworks,
    },
    setPreferredChainId: (chainId: number) => {
      console.trace('WalletProvider setPreferredChainId === ', chainId);
      setPreferredChainId(chainId);
    },
    setAllowedNetworks,
  };

  return React.createElement(
    WalletContext.Provider,
    { value },
    <WagmiConfig client={wagmiClient} {...wagmiOverrides}>
      <WalletAutomationWrapper
        tryAutoConnect={tryAutoConnect}
        preferredChainId={preferredChainId}
      >
        {children}
      </WalletAutomationWrapper>
    </WagmiConfig>,
  );
};

export const useWalletContext = () => {
  const context = React.useContext(WalletContext);
  if (!context) throw Error('Must be used within <WalletProvider>');
  return context;
};
