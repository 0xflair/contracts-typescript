import { CustodyType } from '@flair-sdk/common';
import type { WalletModule } from '@web3-onboard/common';
import ledgerModule from '@web3-onboard/ledger';

import {
  BaseOptions,
  Web3OnboardConnectorBase,
} from './base/onboard-base-connector';

type Options = BaseOptions & {};

class Web3OnboardLedgerConnector extends Web3OnboardConnectorBase<Options> {
  readonly id = 'web3OnboardLedger';
  name = 'Ledger (USB)';
  icon =
    'https://ipfs.io/ipfs/bafkreiaca3pyolq355exgp7c5etlc7yh6voceglciiswaju46dsbswkctu';
  custodyType = CustodyType.SELF_CUSTODY;

  walletModule!: WalletModule;

  async getWalletModule() {
    if (!this.walletModule) {
      const modules = ledgerModule({})({
        device: {
          os: null,
          browser: null,
          type: null,
        } as any,
      });

      if (!modules) {
        throw new Error('No Ledger module found');
      }

      this.walletModule = Array.isArray(modules) ? modules[0] : modules;
    }

    return this.walletModule;
  }
}

export { Web3OnboardLedgerConnector };
