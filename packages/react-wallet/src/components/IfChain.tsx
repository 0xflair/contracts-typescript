import { BareComponentProps } from '@0xflair/react-common';
import { Fragment, PropsWithChildren } from 'react';
import { useNetwork } from 'wagmi';

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
  const { activeChain, isLoading } = useNetwork();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && (isLoading || !activeChain?.id) ? (
        <>{loadingMask}</>
      ) : activeChain?.id?.toString() === connectedTo?.toString() ? (
        children
      ) : null}
    </Component>
  );
};
