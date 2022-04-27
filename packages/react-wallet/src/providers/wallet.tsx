import { providers } from 'ethers';
import { ReactNode } from 'react';
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

export const setupConnectorsAndProvider = (config?: Config) => {
  const appName = config?.appName || 'Flair';
  const infuraId = config?.infuraId || FLAIR_INFURA_PROJECT_ID;

  const provider = (config: { chainId?: number }) => {
    return new providers.InfuraProvider(config.chainId, infuraId);
  };

  const connectors = ({ chainId }: any) => {
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

  return {
    connectors,
    provider,
  };
};

type Props = {
  children?: ReactNode;
  wagmiOverrides?: Record<string, any>;
};

const { connectors, provider } = setupConnectorsAndProvider();

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const WalletProvider = (props: Props) => {
  const { children, wagmiOverrides } = props;

  return (
    <Provider client={client} {...wagmiOverrides}>
      {children}
    </Provider>
  );
};
