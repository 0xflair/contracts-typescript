import { useEffect, useState } from 'react';
import { useAccount, useSwitchNetwork } from 'wagmi';

const EAGER_CONNECTOR_IDS = ['magic'];

export const useAutoSwitch = (preferredChainId?: number) => {
  const { connector, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork({
    chainId: preferredChainId,
    throwForSwitchChainNotSupported: false,
  });
  const [triedAutoSwitch, setTriedAutoSwitch] = useState(false);

  useEffect(() => {
    if (triedAutoSwitch || !isConnected) {
      return;
    }

    if (preferredChainId && switchNetwork && connector?.id) {
      setTriedAutoSwitch(true);
      if (EAGER_CONNECTOR_IDS.includes(connector.id)) {
        switchNetwork(preferredChainId);
      }
    }
  }, [
    connector?.id,
    isConnected,
    preferredChainId,
    switchNetwork,
    triedAutoSwitch,
  ]);
};
