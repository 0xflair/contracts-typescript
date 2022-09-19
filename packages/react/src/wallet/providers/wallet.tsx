import {
  FLAIR_CHAINS,
  FLAIR_DEFAULT_CHAIN,
  MagicLinkConnector,
  SafeConnector,
} from '@flair-sdk/common';
import { providers } from 'ethers';
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import { createClient, Provider } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import stylesheet from '../../index.css';
import { FLAIR_INFURA_PROJECT_ID } from '../constants';
import { useAutoConnect } from '../hooks/useAutoConnect';

export type WalletProviderProps = {
  children?: ReactNode;
  appName?: string;
  infuraId?: string;
  custodialWallet?: boolean;
  injectStyles?: boolean;
  wagmiOverrides?: Record<string, any>;
};

const FLAIR_MAGIC_API_KEY = 'pk_live_8B82089A89462668';

const AutoConnectWrapper = ({ children }: PropsWithChildren<any>) => {
  useAutoConnect();

  return <>{children}</>;
};

export const WalletProvider = ({
  children,
  appName = 'Flair',
  infuraId = FLAIR_INFURA_PROJECT_ID,
  custodialWallet = false,
  injectStyles = true,
  wagmiOverrides,
}: WalletProviderProps) => {
  const provider = useCallback(
    (config: { chainId?: number }) => {
      try {
        const prv = new providers.InfuraProvider(config.chainId, infuraId);
        prv.pollingInterval = 20_000;
        return prv;
      } catch (e) {
        try {
          const rpcUrl = FLAIR_CHAINS.find((x) => x.id === config.chainId)
            ?.rpcUrls.default;
          if (rpcUrl) {
            const prv = new providers.JsonRpcProvider(rpcUrl, config.chainId);
            prv.pollingInterval = 20_000;
            return prv;
          } else {
            throw new Error(
              `No configured RPC URL for chain ${config.chainId}`,
            );
          }
        } catch (e) {
          try {
            const prv = providers.getDefaultProvider(config.chainId);
            prv.pollingInterval = 20_000;
            return prv;
          } catch (e) {
            try {
              const prv = new providers.Web3Provider(
                window.ethereum as any,
                config.chainId,
              );
              prv.pollingInterval = 20_000;
              return prv;
            } catch (e) {
              const prv = providers.getDefaultProvider();
              prv.pollingInterval = 20_000;
              return prv;
            }
          }
        }
      }
    },
    [infuraId],
  );

  const connectors = useCallback(
    ({ chainId }: any) => {
      const rpcUrl =
        FLAIR_CHAINS.find((x) => x.id === chainId)?.rpcUrls.default ??
        FLAIR_DEFAULT_CHAIN.rpcUrls.default;

      const connectors: any[] = [
        new InjectedConnector({
          chains: FLAIR_CHAINS,
          options: { shimDisconnect: true },
        }),
        new WalletConnectConnector({
          chains: FLAIR_CHAINS,
          options: {
            infuraId,
            qrcode: true,
          },
        }),
        new CoinbaseWalletConnector({
          chains: FLAIR_CHAINS,
          options: {
            appName,
            jsonRpcUrl: `${rpcUrl}/${infuraId}`,
          },
        }),
        new SafeConnector({
          chains: FLAIR_CHAINS,
          options: {
            debug: true,
          },
        }),
      ];

      if (custodialWallet) {
        connectors.push(
          new MagicLinkConnector({
            chains: FLAIR_CHAINS,
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
    },
    [appName, custodialWallet, infuraId],
  );

  const wagmiClient = useMemo(
    () =>
      createClient({
        autoConnect: false,
        connectors,
        provider,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appName, infuraId],
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
    <Provider client={wagmiClient} {...wagmiOverrides}>
      <AutoConnectWrapper>{children}</AutoConnectWrapper>
    </Provider>
  );
};