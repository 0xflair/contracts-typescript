import { RainbowWalletIcon } from '@flair-sdk/icons';

import { isAndroid } from '../../utils/mobile';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const RainbowWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'rainbow-wallet',
    name: 'Rainbow Wallet',
    logo: RainbowWalletIcon,
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
        : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`;
    },
  };
};
