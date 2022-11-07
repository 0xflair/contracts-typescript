import { ArgentWalletIcon } from '@flair-sdk/icons';

import { isAndroid } from '../../utils/mobile';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const ArgentWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'argent',
    name: 'Argent',
    logo: ArgentWalletIcon,
    getUri: async () => {
      if (!connectors) {
        return '';
      }
      const walletConnect = connectors.find(
        (connector) => connector.id === 'walletConnect',
      );
      if (!walletConnect) {
        return '';
      }

      const { uri } = (await walletConnect.getProvider()).connector;

      return isAndroid()
        ? uri
        : `https://argent.link/app/wc?uri=${encodeURIComponent(uri)}`;
    },
  };
};
