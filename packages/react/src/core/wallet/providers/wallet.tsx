import {
  AlchemyProvider,
  InfuraProvider,
  JsonRpcBatchProvider,
} from '@ethersproject/providers';
import { wrapWagmiClient } from '@flair-sdk/balance-ramp';
import { FLAIR_CHAINS } from '@flair-sdk/chains';
import {
  DiscordWeb3AuthConnector,
  GithubWeb3AuthConnector,
  GoogleWeb3AuthConnector,
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
import deepmerge from 'deepmerge';
import { providers } from 'ethers';
import { hexlify } from 'ethers/lib/utils.js';
import _ from 'lodash';
import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { Required } from 'utility-types';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { useStickyState } from '../../../common/hooks/useStickyState';
import { isDarkMode } from '../../../common/utils/dark-mode';
import stylesheet from '../../../index.css';
import {
  FLAIR_ALCHEMY_API_KEY,
  FLAIR_INFURA_PROJECT_ID,
} from '../constants/index';

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
  tryAutoConnect?: boolean;
  web3AuthOptions?: Web3AuthOptions;
  instanceId?: string;
};

const {
  chains,
  provider: wagmiProvider,
  webSocketProvider,
} = configureChains(FLAIR_CHAINS, [
  (chain) => {
    let httpRpcUrl = chain?.rpcUrls?.default?.http?.[0];
    let websocketRpcUrl = chain?.rpcUrls?.default?.webSocket?.[0];

    try {
      const alchemyConfig = AlchemyProvider.getUrl(
        AlchemyProvider.getNetwork(chain.id),
        FLAIR_ALCHEMY_API_KEY,
      );
      if (alchemyConfig) httpRpcUrl = alchemyConfig.url;
    } catch (e) {}

    try {
      if (!httpRpcUrl) {
        const infuraConfig = InfuraProvider.getUrl(
          InfuraProvider.getNetwork(chain.id),
          FLAIR_INFURA_PROJECT_ID,
        );
        if (infuraConfig) httpRpcUrl = infuraConfig.url;
      }
    } catch (e) {}

    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [httpRpcUrl || ''] },
        },
      },
      provider: () => {
        let provider;

        if (httpRpcUrl) {
          provider = new JsonRpcBatchProvider(httpRpcUrl, {
            ensAddress: chain.contracts?.ensRegistry?.address,
            chainId: chain.id,
            name: chain.network,
          });
        }

        if (!provider) {
          try {
            provider = new providers.Web3Provider(
              ((window as any)?.ethereum as any) ||
                (window as any)?.web3?.currentProvider ||
                (window as any)?.web3?.provider ||
                (window as any)?.BinanceChain ||
                (window as any)?.tally ||
                (window as any)?.gamestop ||
                (window as any)?.bitkeep?.ethereum ||
                (window as any)?.enkrypt?.providers?.ethereum ||
                ((window as any)?.Bitski &&
                  (window as any)?.Bitski?.getProvider &&
                  (window as any)?.Bitski?.getProvider()),
              chain.id,
            );
          } catch (e) {
            provider = providers.getDefaultProvider();
          }
        }

        if (!provider) {
          throw new Error(`Could not find provider for chain ${chain.id} :(`);
        }

        provider.pollingInterval = 20_000;

        return provider;
      },
      ...(websocketRpcUrl
        ? {
            webSocketProvider: () =>
              new providers.WebSocketProvider(
                websocketRpcUrl as string,
                chain.id,
              ),
          }
        : {}),
    };
  },
]);

type WalletContextValue = {
  state: {
    allowedNetworks?: AllowedNetworks;
    preferredChainId?: number;
    web3AuthOptions?: Web3AuthOptions;
  };
  setPreferredChainId: (chainId: number) => void;
  setAllowedNetworks: (allowedNetworks: AllowedNetworks) => void;
  setWeb3AuthOptions: (options: Web3AuthOptions) => void;
};

export const WalletContext = React.createContext<WalletContextValue | null>(
  null,
);

export type AllowedNetworks = 'ALL' | number[];

export const WalletProvider = ({
  children,
  appName = 'My App',
  injectStyles = true,
  tryAutoConnect = true,
  preferredChainId: preferredChainId_,
  web3AuthOptions: web3AuthOptions_,
  instanceId = 'default',
}: WalletProviderProps) => {
  const darkMode = isDarkMode();

  const [web3AuthOptions, setWeb3AuthOptions] = useStickyState<
    Web3AuthOptions | undefined
  >(web3AuthOptions_, `flair.${instanceId}.web3AuthOptions`);

  const [preferredChainId, setPreferredChainId] = useStickyState<
    number | undefined
  >(preferredChainId_, `flair.${instanceId}.preferredChainId`);
  const [allowedNetworks, setAllowedNetworks] = useStickyState<AllowedNetworks>(
    'ALL',
    `flair.${instanceId}.allowedNetworks`,
  );

  const connectors = useCallback(() => {
    const web3OnboardOptions = {
      appName,
      appLogo: 'https://app.flair.dev/logo-light-filled.png',
    };

    const web3AuthConfigured = Boolean(
      web3AuthOptions?.clientId && !web3AuthOptions?.disabled,
    );
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
      // new SafeConnector({
      //   chains,
      //   options: {
      //     debug: true,
      //   },
      // }),
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
        connectors: connectorsList,
        provider: wagmiProvider,
        webSocketProvider,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectorsList]);

  useEffect(() => {
    if (!_.isEqual(web3AuthOptions_, web3AuthOptions)) {
      setWeb3AuthOptions(web3AuthOptions_);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      key={`${preferredChainId}:${connectorsList.length}:${web3AuthOptions?.clientId}`}
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
