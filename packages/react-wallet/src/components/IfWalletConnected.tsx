import { BareComponentProps } from '@0xflair/react-common';
import { Fragment, PropsWithChildren } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

type Props = PropsWithChildren<BareComponentProps>;

export const IfWalletConnected = ({ as, children, ...attributes }: Props) => {
  const { data: account } = useAccount();
  const { isConnected } = useConnect();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {isConnected && account?.address ? children : null}
    </Component>
  );
};
