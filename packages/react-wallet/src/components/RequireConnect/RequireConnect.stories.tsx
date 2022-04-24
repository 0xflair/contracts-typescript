import React from 'react';

import { WalletProvider } from '../../providers/wallet';
import { RequireConnect } from './RequireConnect';

export default {
  title: 'RequireConnect Component',
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
            Now you are connected and can see the protected content!
          </RequireConnect>
        </li>
      </ul>
    </>
  );
};
