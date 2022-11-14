import { Fragment, PropsWithChildren } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { BareComponentProps } from '../../../common';

type Props = PropsWithChildren<BareComponentProps>;

export const IfWalletNotConnected = ({
  as,
  children,
  ...attributes
}: Props) => {
  const { chain: activeChain } = useNetwork();
  const { address, isConnected } = useAccount();

  console.log('IfWalletNotConnected === ', activeChain, address, isConnected);

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {!isConnected || !address || !activeChain ? children : null}
    </Component>
  );
};
