import {
  ConnectButton,
  ConnectButtonProps,
  DisconnectButton,
  IfWalletNotConnected,
  LoginProvider,
  WalletProvider,
} from '@0xflair/react-wallet';
import React from 'react';
import { useAccount, useBalance, useNetwork, useSigner } from 'wagmi';

import { IfWalletConnected } from '../../../../examples/react/custom-nft-minting-sales/src/wallet/src/components/IfWalletConnected';

export default {
  title: 'ConnectButton Component',
  decorators: [
    (Story: any) => (
      <WalletProvider custodialWallet={true}>
        <Story />
      </WalletProvider>
    ),
  ],
};

export const Default = (args: ConnectButtonProps) => {
  const account = useAccount();
  const balance = useBalance({
    addressOrName: account.data?.address,
    enabled: true,
  });
  const network = useNetwork();
  const { data: signer } = useSigner();

  return (
    <div className="bg-gray-100 p-8">
      <IfWalletNotConnected>
        <ConnectButton {...args} />
      </IfWalletNotConnected>
      <IfWalletConnected>
        Yay! Connected!
        <DisconnectButton />
      </IfWalletConnected>
      <ul className="mt-5">
        {account?.data ? (
          <li>
            <div>{account?.data?.address}</div>
          </li>
        ) : (
          ''
        )}
        <li>
          Account: error={account.error} loading=
          {account.isLoading}
        </li>
        <li>
          Balance: value={balance.data?.symbol} {balance.data?.value.toString()}{' '}
          {balance.data?.unit} error={balance.error} loading=
          {balance.isLoading}
        </li>
        <li>
          Network: name={network.activeChain?.name} error={network.error}{' '}
          loading=
          {network.isLoading}
        </li>
      </ul>
    </div>
  );
};

Default.args = {
  label: 'Connect me',
  custodialWallet: false,
} as ConnectButtonProps;
