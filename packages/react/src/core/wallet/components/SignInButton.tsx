import React from 'react';

import { BareComponentProps } from '../../../common';
import { useSignInContext } from '../providers/sign-in';

type Props = BareComponentProps & {
  label?: React.ReactNode;
  children?: React.ReactNode;
};

export const SignInButton = ({ as, label, children, ...attributes }: Props) => {
  const {
    data: { signedIn },
    isLoading,
    signIn,
  } = useSignInContext();

  const Component = as || 'button';

  if (!signedIn) {
    return (
      <Component
        disabled={signedIn || isLoading}
        onClick={() => signIn()}
        {...attributes}
      >
        {label || `Sign-in`}
      </Component>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return <></>;
};
