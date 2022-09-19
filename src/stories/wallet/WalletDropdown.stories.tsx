import { CoinGeckoProvider } from '@flair-sdk/react-coingecko';
import {
  NetworkSelector,
  RequireConnect,
  WalletDropdown,
  WalletProvider,
} from '@flair-sdk/react-wallet';
import React from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';

export default {
  title: 'WalletDropdown',
  decorators: [
    (Story: any) => (
      <CoinGeckoProvider>
        <WalletProvider>
          <Story />
        </WalletProvider>
      </CoinGeckoProvider>
    ),
  ],
};

export const Default = () => {
  const { activeChain, error, isLoading } = useNetwork();
  const account = useAccount();
  const balance = useBalance({
    addressOrName: account.data?.address,
    enabled: true,
  });
  const network = useNetwork();

  return (
    <div className="p-16 m-16">
      <RequireConnect>
        <ul className="flex flex-col items-center content-center gap-4">
          <li>
            <WalletDropdown />
          </li>
          <li>
            Connected to {(activeChain?.name ?? activeChain?.id) || '...'} /
            error={error} / loading={isLoading}
          </li>
          <li>
            Account: error={account.error} loading=
            {account.isLoading}
          </li>
          <li>
            Balance: value={balance.data?.symbol}{' '}
            {balance.data?.value.toString()} {balance.data?.unit} error=
            {balance.error} loading=
            {balance.isLoading}
          </li>
          <li>
            Network: name={network.activeChain?.name} error={network.error}{' '}
            loading=
            {network.isLoading}
          </li>
          <li>
            <NetworkSelector />
          </li>
        </ul>
      </RequireConnect>
    </div>
  );
};
