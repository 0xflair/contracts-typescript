import { MagicConnector } from '@everipedia/wagmi-magic-connector';
import {
  Chain,
  Connector,
  normalizeChainId,
  UserRejectedRequestError,
} from '@wagmi/core';
import { allChains } from 'wagmi';

export class MagicLinkConnector extends MagicConnector {
  currentChain!: Chain;

  constructor(config: { chains?: Chain[] | undefined; options: any }) {
    super(config);
  }

  async connect() {
    const defaultChainId = 1;

    try {
      const provider = await this.getProvider();

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged);
        provider.on('chainChanged', this.onChainChanged);
        provider.on('disconnect', this.onDisconnect);
      }

      // Check if there is a user logged in
      const isAuthenticated = await this.isAuthorized();

      // if there is a user logged in, return the user
      if (isAuthenticated) {
        return {
          provider,
          chain: {
            id: (await this.switchChain(defaultChainId)).id,
            unsupported: false,
          },
          account: await this.getAccount(),
        };
      }

      // open the modal and process the magic login steps
      if (!this.isModalOpen) {
        const output = await this.getUserDetailsByForm();
        const magic = this.getMagicSDK();

        // LOGIN WITH MAGIC LINK WITH OAUTH PROVIDER
        if (output.oauthProvider) {
          await magic.oauth.loginWithRedirect({
            provider: output.oauthProvider,
            redirectURI: this.oauthCallbackUrl || window.location.href,
          });
        }

        // LOGIN WITH MAGIC LINK WITH EMAIL
        if (output.email) {
          await magic.auth.loginWithMagicLink({
            email: output.email,
          });
        }

        const signer = await this.getSigner();
        const account = await signer.getAddress();

        return {
          account,
          chain: {
            id: (await this.switchChain(defaultChainId)).id,
            unsupported: false,
          },
          provider,
        };
      }
      throw new UserRejectedRequestError('User rejected request');
    } catch (error) {
      throw new UserRejectedRequestError();
    }
  }

  async switchChain(chainId: number): Promise<Chain> {
    const chains = [...this.chains, ...allChains];
    const selectedChain = chains.find((x) => x.id === chainId) ?? {
      id: chainId,
      name: `Chain ${chainId}`,
      rpcUrls: { default: '' },
    };

    this.magicOptions = {
      ...(this.magicOptions || {}),
      additionalMagicOptions: {
        ...(this.magicOptions.additionalMagicOptions || {}),
        network: {
          chainId: selectedChain.id,
          rpcUrl: selectedChain.rpcUrls.default,
        },
      },
    };

    this.provider = null;
    this.magicSDK = this.getMagicSDK();

    const provider = await this.getProvider();

    if (provider.on) {
      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);
    }

    this.onChainChanged(selectedChain.id);

    return (this.currentChain = selectedChain);
  }

  async getChainId(): Promise<number> {
    return this.currentChain.id;
  }
}
