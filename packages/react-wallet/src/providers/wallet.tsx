import { useMemo } from 'react';
import { createClient, Provider } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import {
  FLAIR_CHAINS,
  FLAIR_DEFAULT_CHAIN,
  FLAIR_INFURA_PROJECT_ID,
} from '../constants';

type Config = {
  appName?: string;
  infuraId?: string;
};

const setupConnectors = (config: Config) => {
  const appName = config.appName || 'Flair';
  const infuraId = config.infuraId || FLAIR_INFURA_PROJECT_ID;

  return ({ chainId }: any) => {
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
  };
};

type Props = Config & {
  children?: React.ReactNode;
  wagmiOverrides?: Record<string, any>;
};

export const WalletProvider = (props: Props) => {
  const { children, appName, infuraId, wagmiOverrides } = props;

  const connectors = useMemo(
    () => setupConnectors({ appName, infuraId }),
    [appName, infuraId]
  );

  const client = useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors,
      }),
    [connectors]
  );

  return (
    <Provider client={client} {...wagmiOverrides}>
      {children}
    </Provider>
  );
};
