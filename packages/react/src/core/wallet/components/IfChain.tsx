import { Fragment, PropsWithChildren } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { BareComponentProps } from '../../../common';

type Props = PropsWithChildren<
  BareComponentProps & {
    loadingMask?: React.ReactNode;
    connectedTo?: number;
  }
>;

export const IfChain = ({
  as,
  children,
  loadingMask = '...',
  connectedTo,
  ...attributes
}: Props) => {
  const { chain } = useNetwork();
  const { isConnecting } = useAccount();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && (isConnecting || !chain?.id) ? (
        <>{loadingMask}</>
      ) : chain?.id?.toString() === connectedTo?.toString() ? (
        children
      ) : null}
    </Component>
  );
};
