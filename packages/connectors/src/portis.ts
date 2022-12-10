import type { WalletModule } from '@web3-onboard/common';
import portisModule from '@web3-onboard/portis';

import { CustodyType } from '@flair-sdk/common';

import {
  BaseOptions,
  Web3OnboardConnectorBase,
} from './base/onboard-base-connector';

type Options = BaseOptions & {};

class Web3OnboardPortisConnector extends Web3OnboardConnectorBase<Options> {
  readonly id = 'web3OnboardPortis';
  name = 'Portis';
  custodyType = CustodyType.THIRD_PARTY;

  walletModule!: WalletModule;

  getWalletModule() {
    if (!this.walletModule) {
      const modules = portisModule({
        apiKey: '78fdcb96-6f55-43ae-a5a2-77e870455a0b',
      })({
        device: {
          os: null,
          browser: null,
          type: null,
        } as any,
      });

      if (!modules) {
        throw new Error('No Portis module found');
      }

      this.walletModule = Array.isArray(modules) ? modules[0] : modules;
    }

    return this.walletModule;
  }
}

export { Web3OnboardPortisConnector };
