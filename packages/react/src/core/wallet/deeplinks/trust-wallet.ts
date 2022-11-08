import { TrustWalletIcon } from '@flair-sdk/icons';

import { openWalletConnectDeepLink } from '../../utils';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const TrustWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'trust-wallet',
    name: 'Trust Wallet',
    logo: TrustWalletIcon,
    fire: async () => {
      const inAppBrowser = Boolean(
        typeof window !== 'undefined' && window.ethereum?.isTrust,
      );

      if (inAppBrowser) {
        return;
      }

      openWalletConnectDeepLink(
        `https://link.trustwallet.com/wc?uri=`,
        connectors,
      );
    },
  };
};
