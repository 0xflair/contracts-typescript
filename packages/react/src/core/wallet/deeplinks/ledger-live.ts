import { LedgerLiveIcon } from '@flair-sdk/icons';

import { openWalletConnectDeepLink } from '../../utils';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const LedgerLiveDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'ledger-live',
    name: 'Ledger Live',
    logo: LedgerLiveIcon,
    fire: async () => {
      openWalletConnectDeepLink(`ledgerlive://wc?uri=`, connectors);
    },
  };
};
