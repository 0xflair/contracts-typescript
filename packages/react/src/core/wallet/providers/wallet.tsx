import { FLAIR_CHAINS } from '@flair-sdk/common';
import {
  DiscordWeb3AuthConnector,
  GithubWeb3AuthConnector,
  GoogleWeb3AuthConnector,
  SafeConnector,
  TwitchWeb3AuthConnector,
  TwitterWeb3AuthConnector,
  Web3AuthOptions as Web3AuthOptionsOriginal,
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
import deepmerge from 'deepmerge';
import { hexlify } from 'ethers/lib/utils';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Required } from 'utility-types';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { isDarkMode } from '../../../common/utils/dark-mode';
import stylesheet from '../../../index.css';
import { wrapWagmiClient } from '../../balance-ramp';
import { FLAIR_ALCHEMY_API_KEY, FLAIR_INFURA_PROJECT_ID } from '../constants';

export type Web3AuthOptions = Required<
  Partial<Web3AuthOptionsOriginal>,
  'clientId'
>;

export type WalletProviderProps = {
  children?: ReactNode;
  appName?: string;
  preferredChainId?: number;
  custodialWallet?: boolean;
  injectStyles?: boolean;
  wagmiOverrides?: Record<string, any>;
  tryAutoConnect?: boolean;
  web3AuthOptions?: Web3AuthOptions;
};

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

      return { http: chain.rpcUrls.default.http[0] };
    },
  }),
]);

type LoginContextValue = {
  state: {
    allowedNetworks?: AllowedNetworks;
    preferredChainId?: number;
    web3AuthOptions?: Web3AuthOptions;
  };
  setPreferredChainId: (chainId: number) => void;
  setAllowedNetworks: (allowedNetworks: AllowedNetworks) => void;
  setWeb3AuthOptions: (options: Web3AuthOptions) => void;
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
  web3AuthOptions: web3AuthOptions_,
}: WalletProviderProps) => {
  const darkMode = isDarkMode();

  const [web3AuthOptions, setWeb3AuthOptions] = useState<
    Web3AuthOptions | undefined
  >(web3AuthOptions_);

  const [preferredChainId, setPreferredChainId] = useState<number | undefined>(
    preferredChainId_,
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
              host: preferredChain.rpcUrls?.default?.http?.[0],
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

    const web3AuthConfigured = Boolean(web3AuthOptions?.clientId);
    const finalWeb3AuthOptions: Web3AuthOptionsOriginal = deepmerge(
      web3AuthOptions || {},
      {
        network: 'cyan',
        uiConfig: {
          theme: isDarkMode() ? 'dark' : undefined,
        },
        socialLoginConfig: {
          mfaLevel: 'optional',
        },
        uxMode: 'popup',
        displayErrorsOnModal: true,
        chainId: hexlify(preferredChainId || 1).toString(),
      },
    );

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

    if (web3AuthConfigured) {
      connectors.push(
        new GoogleWeb3AuthConnector({
          chains,
          options: finalWeb3AuthOptions,
        }),
        new TwitterWeb3AuthConnector({
          chains,
          options: finalWeb3AuthOptions,
        }),
        new TwitchWeb3AuthConnector({
          chains,
          options: finalWeb3AuthOptions,
        }),
        new GithubWeb3AuthConnector({
          chains,
          options: finalWeb3AuthOptions,
        }),
        new DiscordWeb3AuthConnector({
          chains,
          options: finalWeb3AuthOptions,
        }),
      );
    }

    connectors
      ?.filter((c) => c instanceof Web3AuthConnector)
      ?.map((c) => {
        c?.web3AuthInstance?.addPlugin?.(torusPlugin);
      });

    return connectors;
  }, [appName, darkMode, preferredChainId, web3AuthOptions]);

  const connectorsList = useMemo(connectors, [
    connectors,
    preferredChainId,
    web3AuthOptions,
  ]);

  const wagmiClient = useMemo(() => {
    return wrapWagmiClient(
      createClient({
        autoConnect: tryAutoConnect,
        connectors: () => connectorsList,
        provider: wagmiProvider,
        webSocketProvider,
      }),
    );
  }, [connectorsList, tryAutoConnect]);

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
      web3AuthOptions,
    },
    setPreferredChainId,
    setAllowedNetworks,
    setWeb3AuthOptions,
  };

  return React.createElement(
    WalletContext.Provider,
    { value },
    <WagmiConfig
      client={wagmiClient}
      {...wagmiOverrides}
      key={connectorsList.length}
    >
      {children}
    </WagmiConfig>,
  );
};

export const useWalletContext = () => {
  const context = React.useContext(WalletContext);
  if (!context) throw Error('Must be used within <WalletProvider>');
  return context;
};
