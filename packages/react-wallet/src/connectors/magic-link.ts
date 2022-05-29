import { MagicConnector } from '@everipedia/wagmi-magic-connector';
import { UserRejectedRequestError } from '@wagmi/core';
import { allChains, Chain } from 'wagmi';

export class MagicLinkConnector extends MagicConnector {
  currentChain!: Chain;

  constructor(config: { chains?: Chain[] | undefined; options: any }) {
    super(config);
  }

  async connect() {
    if (!this.currentChain) {
      const defaultChainId = 137;
      this.switchChain(defaultChainId);
    }

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
            id: this.currentChain.id,
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
            id: this.currentChain.id,
            unsupported: false,
          },
          provider,
        };
      }
      throw new UserRejectedRequestError('User rejected request');
    } catch (error) {
      throw new UserRejectedRequestError(error);
    }
  }

  private updateMagicOptionsForChain(chainId: number): Chain {
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
        network: selectedChain?.rpcUrls?.default
          ? {
              chainId: selectedChain.id,
              rpcUrl: selectedChain.rpcUrls.default,
            }
          : 'rinkeby',
      },
    };

    this.currentChain = selectedChain;

    return selectedChain;
  }

  async switchChain(chainId: number): Promise<Chain> {
    const selectedChain = this.updateMagicOptionsForChain(chainId);

    this.provider = null;
    // @ts-ignore
    this.magicSDK = null;

    const provider = await this.getProvider();

    if (provider.on) {
      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);
    }

    this.magicSDK = this.getMagicSDK();

    this.onChainChanged(selectedChain.id);

    return selectedChain;
  }

  async getChainId(): Promise<number> {
    return this.currentChain.id;
  }
}
