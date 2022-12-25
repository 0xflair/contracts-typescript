import { Provider } from '@ethersproject/providers';
import { QueryClient } from '@tanstack/react-query';
import { Client } from '@wagmi/core';
import { providers } from 'ethers';

import { wrapEthersSigner } from './wrapEthersSigner';

export type BalanceProvider = Provider & {
  ensureNativeBalance: (amountWei: string) => void;
  ensureERC20Balance: (address: string, amountWei: string) => void;
};

export const wrapWagmiClient = (
  client: Client<any, any> & {
    queryClient: QueryClient;
  },
) => {
  Object.values(client.connectors).forEach((connector) => {
    const originalGetSigner = connector.getSigner;
    connector.getSigner = async (...args) => {
      const signer = (await originalGetSigner.apply(
        connector,
        args,
      )) as providers.JsonRpcSigner;
      return wrapEthersSigner(signer);
    };
  });

  return client;
};
