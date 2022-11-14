import { InjectedWalletModule } from '@web3-onboard/injected-wallets/dist/types';

import { CustodyType } from '../types';
import { Web3OnboardInjectedConnectorBase } from './base/onboard-injected-base';

class Web3OnboardGamestopConnector extends Web3OnboardInjectedConnectorBase {
  readonly id = 'web3onboard-gamestop';
  custodyType = CustodyType.SELF_CUSTODY;

  async selectModule(wallets: InjectedWalletModule[]) {
    return wallets.find((w) => w.label.toLowerCase().includes('gamestop'));
  }
}

export { Web3OnboardGamestopConnector };