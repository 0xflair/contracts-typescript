import { Fragment, PropsWithChildren } from 'react';
import { useAccount } from 'wagmi';

import { BareComponentProps } from '../../../common';
import { useSignInContext } from '../providers';

type Props = PropsWithChildren<BareComponentProps>;

export const IfWalletNotSignedIn = ({ as, children, ...attributes }: Props) => {
  const { address } = useAccount();
  const {
    data: { signedIn },
  } = useSignInContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {!address || !signedIn ? children : null}
    </Component>
  );
};
