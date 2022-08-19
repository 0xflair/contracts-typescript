import { FLAIR_CHAINS, FLAIR_DEFAULT_CHAIN } from '@0xflair/react-common';
import { providers } from 'ethers';
import { ReactNode, useCallback, useLayoutEffect, useMemo } from 'react';
import { createClient, Provider } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { MagicLinkConnector } from '../connectors/magic-link';
import { FLAIR_INFURA_PROJECT_ID } from '../constants';
import stylesheet from '../index.css';

type Props = {
  children?: ReactNode;
  appName?: string;
  infuraId?: string;
  custodialWallet?: boolean;
  injectStyles?: boolean;
  wagmiOverrides?: Record<string, any>;
};

const FLAIR_MAGIC_API_KEY = 'pk_live_8B82089A89462668';

export const WalletProvider = ({
  children,
  appName = 'Flair',
  infuraId = FLAIR_INFURA_PROJECT_ID,
  custodialWallet = false,
  injectStyles = true,
  wagmiOverrides,
}: Props) => {
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

  const client = useMemo(
    () =>
      createClient({
        autoConnect: true,
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
    <Provider client={client} {...wagmiOverrides}>
      {children}
    </Provider>
  );
};
