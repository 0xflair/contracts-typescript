import { FLAIR_CHAINS } from '@flair-sdk/common';
import {
  DiscordWeb3AuthConnector,
  GithubWeb3AuthConnector,
  GoogleWeb3AuthConnector,
  MagicLinkConnector,
  SafeConnector,
  SequenceConnector,
  TwitchWeb3AuthConnector,
  TwitterWeb3AuthConnector,
  Web3OnboardBinanceConnector,
  Web3OnboardBraveConnector,
  Web3OnboardGamestopConnector,
  Web3OnboardLedgerConnector,
  Web3OnboardPortisConnector,
  Web3OnboardTrustConnector,
} from '@flair-sdk/connectors';
import { OAuthExtension, OAuthProvider } from '@magic-ext/oauth';
import { MagicSDKAdditionalConfiguration } from '@magic-sdk/provider';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Options as Web3AuthOptionsOriginal } from '@web3auth/web3auth-wagmi-connector/dist/types/lib/interfaces';
import deepmerge from 'deepmerge';
import { hexlify } from 'ethers/lib/utils';
import React, {
  PropsWithChildren,
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
import { useAutoConnect } from '../hooks/useAutoConnect';
import { useAutoSwitch } from '../hooks/useAutoSwitch';

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
  magicLinkOptions?: MagicLinkOptions;
  web3AuthOptions?: Web3AuthOptions;
};

export interface MagicLinkOptions {
  apiKey: string;
  accentColor?: string;
  isDarkMode?: boolean;
  customLogo?: string;
  customHeaderText?: string;
  enableEmailLogin?: boolean;
  enableSMSlogin?: boolean;
  oauthOptions?: {
    providers: OAuthProvider[];
    callbackUrl?: string;
  };
  additionalMagicOptions?: MagicSDKAdditionalConfiguration<
    string,
    OAuthExtension[]
  >;
}

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
    web3AuthOptions?: Web3AuthOptions;
    magicLinkOptions?: MagicLinkOptions;
  };
  setPreferredChainId: (chainId: number) => void;
  setAllowedNetworks: (allowedNetworks: AllowedNetworks) => void;
  setMagicLinkOptions: (options: MagicLinkOptions) => void;
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
  magicLinkOptions: magicLinkOptions_,
}: WalletProviderProps) => {
  const darkMode = isDarkMode();

  const [web3AuthOptions, setWeb3AuthOptions] = useState<
    Web3AuthOptions | undefined
  >(web3AuthOptions_);
  const [magicLinkOptions, setMagicLinkOptions] = useState<
    MagicLinkOptions | undefined
  >(magicLinkOptions_);

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
        chainId: hexlify(preferredChainId).toString(),
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

    if (magicLinkOptions?.apiKey) {
      connectors.push(
        new MagicLinkConnector({
          chains,
          options: deepmerge(magicLinkOptions, {
            isDarkMode: darkMode,
            oauthOptions: {
              providers: ['google', 'twitter', 'github', 'twitch', 'discord'],
            },
            customHeaderText: appName,
          }),
        }),
      );
    }

    connectors
      ?.filter((c) => c instanceof Web3AuthConnector)
      ?.map((c) => {
        c?.web3AuthInstance?.addPlugin?.(torusPlugin);
      });

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
      web3AuthOptions,
      magicLinkOptions,
    },
    setPreferredChainId: (chainId: number) => {
      console.trace('WalletProvider setPreferredChainId === ', chainId);
      setPreferredChainId(chainId);
    },
    setAllowedNetworks,
    setMagicLinkOptions,
    setWeb3AuthOptions,
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
