import { useEffect, useState } from 'react';
import { useClient, useConnect } from 'wagmi';

const EAGER_CONNECTOR_IDS = ['safe'];

function useAutoConnect() {
  const { connect, connectors, isConnecting, isReconnecting } = useConnect();
  const [triedAutoConnect, setTriedAutoConnect] = useState(false);
  const wagmiClient = useClient();

  useEffect(() => {
    let eagerlyConnected = false;

    EAGER_CONNECTOR_IDS.forEach((connector) => {
      const connectorInstance = connectors.find(
        (c) => c.id === connector && c.ready,
      );

      if (connectorInstance) {
        try {
          connect(connectorInstance);
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
      !isReconnecting
    ) {
      setTriedAutoConnect(true);
      wagmiClient.autoConnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect, connectors]);
}

export { useAutoConnect };
