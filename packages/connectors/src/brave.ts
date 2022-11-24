import { CustodyType } from '@flair-sdk/common';
import { InjectedWalletModule } from '@web3-onboard/injected-wallets/dist/types';

import { Web3OnboardInjectedConnectorBase } from './base/onboard-injected-base';

class Web3OnboardBraveConnector extends Web3OnboardInjectedConnectorBase {
  readonly id = 'web3onboard-brave';
  custodyType = CustodyType.SELF_CUSTODY;

  async selectModule(wallets: InjectedWalletModule[]) {
    return wallets.find((w) => w.label.toLowerCase().includes('brave'));
  }
}

export { Web3OnboardBraveConnector };
