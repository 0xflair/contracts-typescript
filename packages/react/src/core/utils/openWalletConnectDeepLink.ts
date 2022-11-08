import { Connector } from '@wagmi/core';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';

import { isAndroid } from './mobile';

export const openWalletConnectDeepLink = async (
  wcUriPrefix: string,
  connectors?: Connector<any, any, any>[],
): Promise<void> => {
  if (!connectors) {
    return;
  }
  const walletConnect = connectors.find(
    (c) => c.id == 'walletConnect' && !c.options.qrcode,
  ) as WalletConnectConnector;

  if (!walletConnect) {
    return;
  }

  if (!walletConnect.ready) {
    return;
  }

  await walletConnect.connect();

  const { uri } = (await walletConnect.getProvider()).connector;
  const finalLink = isAndroid()
    ? uri
    : `${wcUriPrefix}${encodeURIComponent(uri)}`;

  if (finalLink.startsWith('http')) {
    const link = document.createElement('a');
    link.href = finalLink;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    link.click();
  } else {
    window.location.href = finalLink;
  }
};
