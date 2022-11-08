import { ArgentWalletIcon } from '@flair-sdk/icons';

import { openWalletConnectDeepLink } from '../../utils';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const ArgentWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'argent',
    name: 'Argent',
    logo: ArgentWalletIcon,
    fire: async () => {
      openWalletConnectDeepLink(`https://argent.link/app/wc?uri=`, connectors);
    },
  };
};
