import { providers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { Provider } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { InjectedConnector } from 'wagmi-core';

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
      FLAIR_CHAINS.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
      FLAIR_DEFAULT_CHAIN.rpcUrls[0];

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
      new WalletLinkConnector({
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connectors = useMemo(() => setupConnectors(props), [appName, infuraId]);

  const provider = useCallback(
    ({ chainId }: any) => new providers.InfuraProvider(chainId, infuraId),
    [infuraId]
  );

  return (
    <Provider
      autoConnect={true}
      connectors={connectors}
      provider={provider}
      {...wagmiOverrides}
    >
      {children}
    </Provider>
  );
};
