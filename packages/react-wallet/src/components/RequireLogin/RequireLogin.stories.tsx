import { Environment } from '@0xflair/react-common';
import React from 'react';

import { AutoLoginMode, LoginProvider } from '../../providers/login';
import { WalletProvider } from '../../providers/wallet';
import { RequireConnect } from '../RequireConnect/RequireConnect';
import { RequireLogin } from './RequireLogin';

export default {
  title: 'RequireLogin Component',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
  argTypes: {
    env: {
      options: [Environment.DEV, Environment.PROD],
      control: { type: 'radio' },
    },
    autoLogin: {
      options: [
        AutoLoginMode.NEVER,
        AutoLoginMode.ONLY_IF_PREVIOUSLY_LOGGED_IN,
        AutoLoginMode.ALWAYS,
      ],
      control: { type: 'radio' },
    },
  },
};

type Props = {
  env?: Environment;
  autoLogin?: AutoLoginMode;
};

export const Default = (props: Props) => {
  return (
    <LoginProvider env={props.env} autoLogin={props.autoLogin}>
      <ul className="grid gap-4">
        <li>
          <RequireConnect>
            <RequireLogin>
              Now you are logged in and can see the protected content!
            </RequireLogin>
          </RequireConnect>
        </li>
      </ul>
    </LoginProvider>
  );
};

Default.args = {
  env: Environment.DEV,
  autoLogin: AutoLoginMode.ALWAYS,
};
