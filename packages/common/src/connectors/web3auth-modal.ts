import {
  normalizeChainId,
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from '@wagmi/core';
import LoginModal, { LOGIN_MODAL_EVENTS } from '@web3auth/ui';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { hexlify } from 'ethers/lib/utils';

import { CustodyType } from '../types';
import { ExtendedConnector } from './base/extended-connector';

export class Web3AuthModalConnector
  extends Web3AuthConnector
  implements ExtendedConnector
{
  // @ts-ignore
  name = 'Web3Auth.io';
  icon = 'https://web3auth.io/images/w3a-L-Favicon-1.svg';
  available: boolean = true;
  custodyType: CustodyType = CustodyType.MPC;

  async connect() {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        // @ts-ignore
        (this.loginModal as LoginModal).on(
          LOGIN_MODAL_EVENTS.MODAL_VISIBILITY,
          (visibility) => {
            if (!visibility) {
              this.isAuthorized().then((authorized) => {
                console.log(
                  'WEB3AUUUUTH CONNECTED authorized ==== ',
                  authorized,
                );
                if (!authorized) {
                  reject(new Error('User closed modal'));
                }
              });
            }
          },
        );
      }, 100);

      return super
        .connect()
        .then(async (result) => {
          const account = await this.getAccount();
          const id = await this.getChainId();

          resolve({
            account,
            provider: result.provider,
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

      const tmp = new Web3AuthModalConnector({
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
