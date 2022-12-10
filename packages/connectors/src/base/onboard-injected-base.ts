import { Chain } from '@wagmi/core';
import injectedModule from '@web3-onboard/injected-wallets';
import { InjectedWalletModule } from '@web3-onboard/injected-wallets/dist/types';
import injectedModuleWallets from '@web3-onboard/injected-wallets/dist/wallets';

import { getDevice } from '../utils';
import {
  BaseOptions,
  Web3OnboardConnectorBase,
} from './onboard-base-connector';

export type InjectedBaseOptions = BaseOptions & {};

let availableInjectedWallets: InjectedWalletModule[] | undefined;

const getAvailableInjectedWallets = () => {
  if (!availableInjectedWallets) {
    availableInjectedWallets = injectedModule({})({
      device: getDevice() as any,
    }) as InjectedWalletModule[];
  }

  return availableInjectedWallets;
};

abstract class Web3OnboardInjectedConnectorBase<
  Options extends InjectedBaseOptions = any,
> extends Web3OnboardConnectorBase<Options> {
  walletModule!: InjectedWalletModule;

  constructor(config: { chains?: Chain[]; options: Options }) {
    super({ ...config, options: config.options });

    const module = this.getWalletModule();
    this.walletModule = module;
    this.name = module.label;

    if (getAvailableInjectedWallets().find((w) => w.label === module.label)) {
      this.available = true;
    }
  }

  abstract selectModule(
    wallets: InjectedWalletModule[],
  ): InjectedWalletModule | undefined;

  getWalletModule(): InjectedWalletModule {
    if (!this.walletModule) {
      const mod = this.selectModule(injectedModuleWallets);

      if (!mod) {
        debugger;
        throw new Error(
          'No injected module returned from options.selectModule',
        );
      }

      this.walletModule = mod;
    }

    return this.walletModule;
  }
}

export { Web3OnboardInjectedConnectorBase };
