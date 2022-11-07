import { LedgerLiveIcon } from '@flair-sdk/icons';

import { isAndroid } from '../../utils/mobile';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const LedgerLiveDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'ledger-live',
    name: 'Ledger Live',
    logo: LedgerLiveIcon,
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
        : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
    },
  };
};
