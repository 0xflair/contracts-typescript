import { Web3Provider } from '@ethersproject/providers';
import { CustodyType } from '@flair-sdk/common';
import {
  Chain,
  Connector,
  ConnectorNotFoundError,
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from '@wagmi/core';
import type { EIP1193Provider, WalletModule } from '@web3-onboard/common';
import { BigNumber, utils } from 'ethers';
import EventEmitter from 'eventemitter3';

import { ExtendedConnector } from './extended-connector';

function normalizeChainId(chainId: string | number) {
  if (typeof chainId === 'string') {
    const isHex = chainId.trim().substring(0, 2);

    return Number.parseInt(chainId, isHex === '0x' ? 16 : 10);
  }
  return chainId;
}

export type BaseOptions = {
  appName: string;
  appLogo: string;
};

abstract class Web3OnboardConnectorBase<TOptions extends BaseOptions>
  extends Connector<any, TOptions>
  implements ExtendedConnector
{
  name: string = '';
  icon?: ExtendedConnector['icon'];
  ready: boolean = true;
  available: boolean = true;
  custodyType: CustodyType = CustodyType.UNKNOWN;

  provider!: EIP1193Provider;

  constructor(config: { chains?: Chain[]; options: TOptions }) {
    super({ ...config, options: config.options });

    try {
      const module = this.getWalletModule();
      if (!this.name) {
        this.name = module.label;
      }
      this.ready = true;
      this.available = true;

      if (!this.icon) {
        this.icon = module.getIcon().then((icon) => {
          this.icon = icon;
          return icon;
        });
      }
    } catch (e: any) {
      this.ready = false;
      this.available = false;
      this.emit('error', e);
    }
  }

  abstract getWalletModule(): WalletModule;

  async connect() {
    const provider = await this.getProvider();

    if (provider?.on) {
      provider.on('accountsChanged', this.onAccountsChanged.bind(this));
      provider.on('chainChanged', this.onChainChanged.bind(this));
      provider.on('disconnect', this.onDisconnect.bind(this));
    }

    const account = await this.getAccount();
    const id = await this.getChainId();

    return {
      account,
      provider,
      chain: { id, unsupported: await this.isChainUnsupported(id) },
    };
  }

  async disconnect() {
    const provider = await this.getProvider();
    if (!provider?.removeListener) return;

    provider.removeListener('accountsChanged', this.onAccountsChanged);
    provider.removeListener('chainChanged', this.onChainChanged);
    provider.removeListener('disconnect', this.onDisconnect);
  }

  async getAccount(): Promise<`0x${string}`> {
    const accounts = await (
      await this.getProvider()
    ).request({ method: 'eth_requestAccounts' });

    if (!accounts.length) {
      throw new Error('No accounts found');
    }

    return accounts[0].toString() as `0x${string}`;
  }

  async getChainId() {
    if (!this.provider) {
      throw new ConnectorNotFoundError();
    }

    return normalizeChainId(
      await this.provider.request({ method: 'eth_chainId' }),
    );
  }

  async getProvider() {
    const walletModule = this.getWalletModule();

    if (!this.provider) {
      this.provider = (
        await walletModule.getInterface({
          chains: this.chains.map((x) => ({
            id: x.id.toString(),
            label: x.name,
            rpcUrl: x.rpcUrls.default.http[0],
            token: x.nativeCurrency?.symbol || 'Token',
          })),
          BigNumber,
          EventEmitter,
          appMetadata: {
            name: this.options?.appName || 'Flair',
            icon: this.options?.appLogo || 'https://wagmi.io/favicon.ico',
          },
        })
      ).provider;
    }

    return this.provider;
  }

  async getSigner() {
    const provider = await this.getProvider();
    const account = await this.getAccount();
    return new Web3Provider(provider, 'any').getSigner(account);
  }

  async isAuthorized() {
    return false;
  }

  switchChain: undefined | any = async (chainId: number) => {
    const provider = await this.getProvider();
    const id = normalizeChainId(chainId);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id.toString() }],
      });
      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          rpcUrls: { default: { http: [''] } },
          nativeCurrency: { name: 'Token', symbol: 'Token', decimals: 18 },
        }
      );
    } catch (error) {
      const message =
        typeof error === 'string'
          ? error
          : (error as ProviderRpcError)?.message;
      if (/user rejected request/i.test(message))
        throw new UserRejectedRequestError(error);
      throw new SwitchChainError(error);
    }
  };

  protected onAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) this.emit('disconnect');
    else this.emit('change', { account: utils.getAddress(accounts[0]) });
  }

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some((x) => x.id === chainId);
  }

  protected onChainChanged(chainId: string | number) {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit('change', { chain: { id, unsupported } });
  }

  protected onDisconnect() {
    this.emit('disconnect');
  }
}

export { Web3OnboardConnectorBase };
