import { Chain, Connector, normalizeChainId } from '@wagmi/core';
import * as web3authBase from '@web3auth/base';
import * as web3authCore from '@web3auth/core';
import * as web3authOpenLogin from '@web3auth/openlogin-adapter';
import { ethers, Signer } from 'ethers';
import { getAddress } from 'ethers/lib/utils.js';
import log from 'loglevel';

import { Web3AuthOptions } from './web3auth-interfaces';

const IS_SERVER = typeof window === 'undefined';

let globalInstanceWeb3Auth: web3authCore.Web3AuthCore | null = null;
let globalInstanceSocialLoginAdapter: web3authOpenLogin.OpenloginAdapter | null =
  null;

export abstract class Web3AuthConnector extends Connector {
  ready = !IS_SERVER;

  readonly id = 'web3Auth';

  readonly name = 'web3Auth';

  provider!: web3authBase.SafeEventEmitterProvider | null;

  web3AuthInstance!: web3authCore.Web3AuthCore;

  isModalOpen = false;

  web3AuthOptions: Web3AuthOptions;

  socialLoginAdapter: web3authOpenLogin.OpenloginAdapter;

  constructor(config: { chains?: Chain[]; options: Web3AuthOptions }) {
    super(config);
    this.web3AuthOptions = config.options;
    const chainId = config.options.chainId
      ? parseInt(config.options.chainId, 16)
      : 1;
    const chainConfig = this.chains.filter((x) => x.id === chainId);

    const defaultChainConfig = web3authBase.getChainConfig(
      web3authBase.CHAIN_NAMESPACES.EIP155,
      config.options.chainId || '0x1',
    );
    let finalChainConfig: web3authBase.CustomChainConfig = {
      chainNamespace: web3authBase.CHAIN_NAMESPACES.EIP155,
      ...defaultChainConfig,
    } as web3authBase.CustomChainConfig;
    if (chainConfig.length > 0) {
      let currentChain = chainConfig[0];
      if (config.options.chainId) {
        currentChain =
          chainConfig.find(
            (chain) =>
              chain.id === normalizeChainId(config.options.chainId as string),
          ) || chainConfig[0];
      }
      finalChainConfig = {
        ...finalChainConfig,
        chainNamespace: web3authBase.CHAIN_NAMESPACES.EIP155,
        chainId: `0x${currentChain.id.toString(16)}`,
        rpcTarget: currentChain.rpcUrls.default.http[0],
        displayName: currentChain.name,
        tickerName: currentChain.nativeCurrency?.name,
        ticker: currentChain.nativeCurrency?.symbol,
        blockExplorer: currentChain?.blockExplorers?.default?.url as string,
      };
    }
    if (!globalInstanceWeb3Auth) {
      globalInstanceWeb3Auth = new web3authCore.Web3AuthCore({
        clientId: config.options.clientId,
        enableLogging: config.options.enableLogging,
        storageKey: config.options.storageKey,
        chainConfig: finalChainConfig,
      });
    }

    this.web3AuthInstance = globalInstanceWeb3Auth;

    if (!globalInstanceSocialLoginAdapter) {
      globalInstanceSocialLoginAdapter = new web3authOpenLogin.OpenloginAdapter(
        {
          adapterSettings: {
            ...config.options,
          },
          loginSettings: {
            ...(config.options?.socialLoginConfig || {}),
          },
          chainConfig: finalChainConfig,
        },
      );
      this.web3AuthInstance.configureAdapter(globalInstanceSocialLoginAdapter);
    }

    this.socialLoginAdapter = globalInstanceSocialLoginAdapter;

    this.initIfNotYet();
  }

  async initIfNotYet(): Promise<void> {
    try {
      if (
        !this.socialLoginAdapter?.status ||
        [
          web3authBase.ADAPTER_STATUS.DISCONNECTED,
          web3authBase.ADAPTER_STATUS.ERRORED,
          web3authBase.ADAPTER_STATUS.NOT_READY,
        ].includes(this.socialLoginAdapter.status as any)
      ) {
        await this.web3AuthInstance?.init();
      }
    } catch (e) {}

    try {
      if (
        !this.socialLoginAdapter?.status ||
        [
          web3authBase.ADAPTER_STATUS.DISCONNECTED,
          web3authBase.ADAPTER_STATUS.ERRORED,
          web3authBase.ADAPTER_STATUS.NOT_READY,
        ].includes(this.socialLoginAdapter.status as any)
      ) {
        await this.socialLoginAdapter.init({
          autoConnect: this.web3AuthInstance.cachedAdapter === 'openlogin',
        });
      }
    } catch (e) {}
  }

  async getAccount(): Promise<`0x${string}`> {
    const p = await this.getProvider();
    if (!p) throw new Error('No provider found for web3auth connector');
    const provider = new ethers.providers.Web3Provider(p);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    return account as `0x${string}`;
  }

  async getProvider() {
    if (this.provider) {
      return this.provider;
    }

    await this.initIfNotYet();

    if (this.web3AuthInstance?.provider) {
      this.provider = this.web3AuthInstance?.provider;
    }

    return this.provider;
  }

  async getSigner(): Promise<Signer> {
    const p = await this.getProvider();
    if (!p) throw new Error('No provider found for web3auth connector');
    const provider = new ethers.providers.Web3Provider(p);
    const signer = provider.getSigner();
    return signer;
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!(account && this.provider);
    } catch {
      return false;
    }
  }

  async getChainId(): Promise<number> {
    try {
      const provider = await this.getProvider();
      if (!provider) {
        const networkOptions = this.socialLoginAdapter.chainConfigProxy;
        if (typeof networkOptions === 'object') {
          const chainID = networkOptions?.chainId;
          if (chainID) {
            return normalizeChainId(chainID);
          }
        }
      } else {
        const chainId = await provider.request({ method: 'eth_chainId' });
        if (chainId) {
          return normalizeChainId(chainId as string);
        }
      }
      throw new Error('Chain ID is not defined');
    } catch (error) {
      log.error('error', error);
      throw error;
    }
  }

  async switchChain(chainId: number) {
    try {
      const chain = this.chains.find((x) => x.id === chainId);
      if (!chain) throw new Error(`Unsupported chainId: ${chainId}`);
      const provider = this.getProvider();
      if (!provider) throw new Error('Please login first');
      // eslint-disable-next-line no-console
      console.log('chain', chain);
      this.provider?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chain.id.toString(16)}`,
            chainName: chain.name,
            rpcUrls: [chain.rpcUrls.default],
            blockExplorerUrls: [chain.blockExplorers?.default?.url],
            nativeCurrency: {
              symbol: chain.nativeCurrency?.symbol || 'ETH',
            },
          },
        ],
      });
      await this.provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chain.id.toString(16)}`,
          },
        ],
      });
      return chain;
    } catch (error) {
      log.error('Error: Cannot change chain', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.web3AuthInstance?.logout();
    this.provider = null;
  }

  protected onAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) this.emit('disconnect');
    else this.emit('change', { account: getAddress(accounts[0]) });
  }

  protected isChainUnsupported(chainId: number): boolean {
    return !this.chains.some((x) => x.id === chainId);
  }

  protected onChainChanged(chainId: string | number): void {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit('change', { chain: { id, unsupported } });
  }

  protected onDisconnect(): void {
    this.emit('disconnect');
  }
}
