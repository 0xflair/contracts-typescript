import { useState } from 'react';
import { useDebounce } from 'react-use';
import { useAccount, useClient, useConnect } from 'wagmi';

const EAGER_CONNECTOR_IDS = ['safe'];

export const useAutoConnect = (tryAutoConnect?: boolean) => {
  const { connect, connectors } = useConnect();
  const { isConnecting, isReconnecting } = useAccount();
  const [triedAutoConnect, setTriedAutoConnect] = useState(false);
  const wagmiClient = useClient();

  useDebounce(
    () => {
      let eagerlyConnected = false;

      EAGER_CONNECTOR_IDS.forEach((connector) => {
        const connectorInstance = connectors.find(
          (c) => c.id === connector && c.ready,
        );

        if (connectorInstance) {
          try {
            connect({ connector: connectorInstance });
            eagerlyConnected = true;
          } catch (e) {
            console.error(`Could not eagerly connect to ${connector}`, e);
          }
        }
      });

      if (
        !eagerlyConnected &&
        !triedAutoConnect &&
        !isConnecting &&
        !isReconnecting &&
        tryAutoConnect
      ) {
        setTriedAutoConnect(true);
        wagmiClient.autoConnect();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    500,
    [tryAutoConnect, connect, connectors],
  );
};
