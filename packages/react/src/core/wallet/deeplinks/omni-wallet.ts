import { OmniWalletIcon } from '@flair-sdk/icons';

import { openWalletConnectDeepLink } from '../../utils';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const OmniWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'omni',
    name: 'Omni',
    logo: OmniWalletIcon,
    fire: async () => {
      openWalletConnectDeepLink(
        `https://links.steakwallet.fi/wc?uri=`,
        connectors,
      );
    },
  };
};
