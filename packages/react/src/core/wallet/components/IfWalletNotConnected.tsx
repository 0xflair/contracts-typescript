import { Fragment, PropsWithChildren } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

import { BareComponentProps } from '../../../common';

type Props = PropsWithChildren<BareComponentProps>;

export const IfWalletNotConnected = ({
  as,
  children,
  ...attributes
}: Props) => {
  const { address, isConnected } = useAccount();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {!isConnected || !address ? children : null}
    </Component>
  );
};
