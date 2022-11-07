import { OmniWalletIcon } from '@flair-sdk/icons';

import { isAndroid } from '../../utils/mobile';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const OmniWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'omni',
    name: 'Omni',
    logo: OmniWalletIcon,
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
        : `https://links.steakwallet.fi/wc?uri=${encodeURIComponent(uri)}`;
    },
  };
};
