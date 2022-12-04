import { CustodyType } from '@flair-sdk/common';
import { InjectedWalletModule } from '@web3-onboard/injected-wallets/dist/types';

import { Web3OnboardInjectedConnectorBase } from './base/onboard-injected-base';

class Web3OnboardBinanceConnector extends Web3OnboardInjectedConnectorBase {
  readonly id = 'web3OnboardBinance';
  custodyType = CustodyType.SELF_CUSTODY;

  async selectModule(wallets: InjectedWalletModule[]) {
    return wallets.find((w) => w.label.toLowerCase().includes('binance'));
  }

  switchChain = undefined;
}

export { Web3OnboardBinanceConnector };
