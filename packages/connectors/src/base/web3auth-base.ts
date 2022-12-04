import { CustodyType } from '@flair-sdk/common';
import {
  normalizeChainId,
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from '@wagmi/core';
import { ADAPTER_STATUS } from '@web3auth/base';
import LoginModal, { LOGIN_MODAL_EVENTS } from '@web3auth/ui';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { hexlify } from 'ethers/lib/utils';

import { ExtendedConnector } from './extended-connector';

export abstract class Web3AuthBaseConnector
  extends Web3AuthConnector
  implements ExtendedConnector
{
  abstract loginProvider: string;
  custodyType = CustodyType.SELF_CUSTODY;
  available = true;

  async connect() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.disconnect();
      } catch (e) {}

      if (this.web3AuthInstance?.status !== ADAPTER_STATUS.READY) {
        await this.web3AuthInstance?.init();
      }

      return this.web3AuthInstance
        ?.connectTo('openlogin', {
          loginProvider: this.loginProvider,
        })
        .then(async (provider) => {
          const account = await this.getAccount();
          const id = await this.getChainId();

          resolve({
            account,
            provider,
            chain: { id, unsupported: await this.isChainUnsupported(id) },
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async switchChain(chainId: number) {
    const id = normalizeChainId(chainId);

    try {
      await this.disconnect();

      const tmp = new Web3AuthConnector({
        chains: this.chains,
        options: {
          ...this.options,
          chainId: hexlify(id).toString(),
        },
      });

      this.web3AuthInstance = tmp.web3AuthInstance;

      // @ts-ignore
      this.socialLoginAdapter = tmp.socialLoginAdapter;

      // @ts-ignore
      this.loginModal = tmp.loginModal;

      // @ts-ignore
      this.subscribeToLoginModalEvents();

      await this.connect();

      this.onChainChanged(id);
      const provider = await this.getProvider();

      if (provider?.on) {
        provider.on('accountsChanged', this.onAccountsChanged.bind(this));
        //provider.on('chainChanged', this.onChainChanged.bind(this));
        provider.on('disconnect', this.onDisconnect.bind(this));
      }

      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          rpcUrls: { default: '' },
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
  }
}
