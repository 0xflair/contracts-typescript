import React from 'react';

import { WalletProvider } from '../../providers/wallet';
import { RequireConnect } from '../RequireConnect/RequireConnect';
import { RequireChain } from './RequireChain';

export default {
  title: 'RequireChain Component',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

export const Default = () => {
  return (
    <>
      <ul className="grid gap-4">
        <li>
          <RequireConnect>
            <RequireChain requiredChainId={4}>
              Now you are connected to correctly expected chain!
            </RequireChain>
          </RequireConnect>
        </li>
      </ul>
    </>
  );
};
