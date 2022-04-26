import React from 'react';
import { useNetwork } from 'wagmi';

import { WalletProvider } from '../../providers/wallet';
import { ConnectButton } from '../ConnectButton/ConnectButton';
import { NetworkSelector } from './NetworkSelector';

export default {
  title: 'NetworkSelector Component',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

export const Default = () => {
  const { activeChain, error, isLoading } = useNetwork();
  return (
    <>
      <ul className="grid gap-4">
        <li>
          <ConnectButton />
        </li>
        <li>Connected to {(activeChain?.name ?? activeChain?.id) || '...'}</li>
        <li>
          <NetworkSelector />
        </li>
        <li>error={error}</li>
        <li>loading={isLoading}</li>
      </ul>
    </>
  );
};
