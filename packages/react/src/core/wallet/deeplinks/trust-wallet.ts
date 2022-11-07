import { TrustWalletIcon } from '@flair-sdk/icons';

import { isAndroid } from '../../utils/mobile';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const TrustWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'trust-wallet',
    name: 'Trust Wallet',
    logo: TrustWalletIcon,
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

      const inAppBrowser = Boolean(
        typeof window !== 'undefined' && window.ethereum?.isTrust,
      );

      if (inAppBrowser) {
        return '';
      }

      const { uri } = (await walletConnect.getProvider()).connector;

      return isAndroid()
        ? uri
        : `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
    },
  };
};
