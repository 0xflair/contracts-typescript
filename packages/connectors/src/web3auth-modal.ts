import { CustodyType } from '@flair-sdk/common';
import {
  Chain,
  normalizeChainId,
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from '@wagmi/core';
import * as web3authBase from '@web3auth/base';
import LoginModal from '@web3auth/ui';
import * as web3authUi from '@web3auth/ui';
import { hexlify } from 'ethers/lib/utils.js';

import { ExtendedConnector } from './base/extended-connector';
import { Web3AuthConnector } from './base/web3auth-core';

export class Web3AuthModalConnector
  extends Web3AuthConnector
  implements ExtendedConnector
{
  // @ts-ignore
  name = 'Social Logins';
  icon = 'https://web3auth.io/images/w3a-L-Favicon-1.svg';
  available: boolean = true;
  custodyType: CustodyType = CustodyType.MPC;

  async connect() {
    return new Promise<any>(async (resolve, reject) => {
      setTimeout(() => {
        // @ts-ignore
        (this.loginModal as LoginModal).on(
          web3authUi.LOGIN_MODAL_EVENTS.MODAL_VISIBILITY,
          (visibility) => {
            if (!visibility) {
              this.isAuthorized().then((authorized) => {
                if (!authorized) {
                  reject(new Error('User closed modal'));
                }
              });
            }
          },
        );
      }, 100);

      try {
        await this.disconnect();
      } catch (e) {}

      try {
        if (
          this.web3AuthInstance?.status !== web3authBase.ADAPTER_STATUS.READY
        ) {
          await this.web3AuthInstance?.init();
        }
      } catch (e) {}

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

  async switchChain(chainId: number): Promise<Chain> {
    const id = normalizeChainId(chainId);

    try {
      try {
        await this.disconnect();
      } catch (e) {}

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

      try {
        if (
          this.web3AuthInstance?.status !== web3authBase.ADAPTER_STATUS.READY
        ) {
          await this.web3AuthInstance?.init();
        }
      } catch (e) {}

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
  }
}
