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
  const [{ data: networkData, error, loading }] = useNetwork();
  return (
    <>
      <ul className="grid gap-4">
        <li>
          <ConnectButton />
        </li>
        <li>
          Connected to{' '}
          {(networkData.chain?.name ?? networkData.chain?.id) || '...'}{' '}
          {networkData.chain?.unsupported && '(unsupported)'}
        </li>
        <li>
          <NetworkSelector />
        </li>
        <li>error={error}</li>
        <li>loading={loading}</li>
      </ul>
    </>
  );
};
