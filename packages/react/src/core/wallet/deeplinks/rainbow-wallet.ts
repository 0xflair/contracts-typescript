import { RainbowWalletIcon } from '@flair-sdk/icons';

import { openWalletConnectDeepLink } from '../../utils';
import { DeepLinkConfig, DeepLinkContext } from '../types/deep-links';

export const RainbowWalletDeepLink = ({
  connectors,
}: DeepLinkContext): DeepLinkConfig => {
  return {
    id: 'rainbow-wallet',
    name: 'Rainbow Wallet',
    logo: RainbowWalletIcon,
    fire: async () => {
      openWalletConnectDeepLink(`https://rnbwapp.com/wc?uri=`, connectors);
    },
  };
};
