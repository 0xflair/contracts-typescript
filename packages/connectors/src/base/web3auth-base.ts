import { CustodyType } from '@flair-sdk/common';
import type { Chain } from '@wagmi/core';
import { SwitchChainError } from '@wagmi/core';

import { ExtendedConnector } from './extended-connector';
import { Web3AuthConnector } from './web3auth-core';

export abstract class Web3AuthBaseConnector
  extends Web3AuthConnector
  implements ExtendedConnector
{
  abstract loginProvider: string;
  custodyType = CustodyType.SELF_CUSTODY;
  available = true;

  async connect() {
    return new Promise<any>(async (resolve, reject) => {
      await this.initIfNotYet();

      try {
        if (this.socialLoginAdapter.status === 'connected') {
          const account = await this.getAccount();
          const id = await this.getChainId();

          const response = {
            account,
            provider: await this.getProvider(),
            chain: { id, unsupported: await this.isChainUnsupported(id) },
          };

          return resolve(response);
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
      } catch (e) {
        reject(e);
      }
    });
  }

  async switchChain(chainId: number): Promise<Chain> {
    throw new SwitchChainError(
      `Cannot switch chain for Web3Auth ${this.name}, must provide preferredChainId via props to <WalletProvider preferredChainId={${chainId}}> or <FlairProvider wallet={{ preferredChainId: ${chainId} }}>`,
    );
  }
}
