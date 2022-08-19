import { ACTION_BUTTON, Errors } from '@0xflair/react-ui';
import { LinkIcon } from '@heroicons/react/solid';
import React, { ReactNode } from 'react';

import { useLoginContext } from '../../providers/login';
import { LoginButton } from '../LoginButton/LoginButton';
import { WalletComponentWrapper } from '../WalletComponentWrapper';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  notLoggedInView?: ReactNode;
  children?: ReactNode;
};

export const RequireLogin = (props: Props) => {
  const { notLoggedInView, children } = props;
  const {
    state: { data: signedInWallet, error },
  } = useLoginContext();

  if (!signedInWallet) {
    return notLoggedInView ? (
      <>{notLoggedInView}</>
    ) : (
      <WalletComponentWrapper
        as={props.as}
        className="flex items-center justify-center h-full"
      >
        <div className="text-center">
          <LinkIcon
            className="mx-auto h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            OK, now login...
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please login using your wallet first, then you can see this section.
          </p>
          {error && (
            <div className="mt-1 text-sm">
              <Errors error={error} />
            </div>
          )}
          <div className="mt-6">
            <LoginButton label="Login" className={ACTION_BUTTON} />
          </div>
        </div>
      </WalletComponentWrapper>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return <></>;
};
