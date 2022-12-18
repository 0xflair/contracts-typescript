import React from 'react';

import { BareComponentProps } from '../../../common';
import { useSignInContext } from '../providers/sign-in';

type Props = BareComponentProps & {
  label?: React.ReactNode;
  children?: React.ReactNode;
};

export const SignOutButton = ({
  as,
  label,
  children,
  ...attributes
}: Props) => {
  const {
    data: { signedIn },
    isLoading,
    signOut,
  } = useSignInContext();

  const Component = as || 'button';

  if (signedIn) {
    return (
      <Component
        disabled={!signedIn || isLoading}
        onClick={() => signOut()}
        {...attributes}
      >
        {label || `Sign-out`}
      </Component>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return <></>;
};
