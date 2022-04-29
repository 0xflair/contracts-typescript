import { providers } from 'ethers';
import { ReactNode, useCallback, useMemo } from 'react';
import { createClient, Provider } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import {
  FLAIR_CHAINS,
  FLAIR_DEFAULT_CHAIN,
  FLAIR_INFURA_PROJECT_ID,
} from '../constants';

type Props = {
  children?: ReactNode;
  appName?: string;
  infuraId?: string;
  wagmiOverrides?: Record<string, any>;
};

export const WalletProvider = ({
  children,
  appName = 'Flair',
  infuraId = FLAIR_INFURA_PROJECT_ID,
  wagmiOverrides,
}: Props) => {
  const provider = useCallback(
    (config: { chainId?: number }) => {
      try {
        return new providers.InfuraProvider(config.chainId, infuraId);
      } catch (e) {
        try {
          return providers.getDefaultProvider(config.chainId);
        } catch (e) {
          try {
            const provider = new providers.Web3Provider(
              window.ethereum as any,
              'any'
            );

            // TODO Remove when wagmi does not fail on useChainId()
            if (provider.network) {
              provider.network.chainId = Number(config.chainId);
            } else {
              // @ts-ignore
              provider.network = {
                chainId: config.chainId,
              };
            }

            return provider;
          } catch (e) {
            return providers.getDefaultProvider();
          }
        }
      }
    },
    [infuraId]
  );

  const connectors = useCallback(
    ({ chainId }: any) => {
      const rpcUrl =
        FLAIR_CHAINS.find((x) => x.id === chainId)?.rpcUrls.default ??
        FLAIR_DEFAULT_CHAIN.rpcUrls.default;

      return [
        new InjectedConnector({
          chains: FLAIR_CHAINS,
          options: { shimDisconnect: true },
        }),
        new WalletConnectConnector({
          options: {
            infuraId,
            qrcode: true,
          },
        }),
        new CoinbaseWalletConnector({
          options: {
            appName,
            jsonRpcUrl: `${rpcUrl}/${infuraId}`,
          },
        }),
      ];
    },
    [appName, infuraId]
  );

  const client = useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors,
        provider,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appName, infuraId]
  );

  return (
    <Provider client={client} {...wagmiOverrides}>
      {children}
    </Provider>
  );
};
