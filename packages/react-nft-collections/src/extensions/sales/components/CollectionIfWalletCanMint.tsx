import { BareComponentProps } from '@0xflair/react-common';
import { Fragment, PropsWithChildren } from 'react';

import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = PropsWithChildren<
  BareComponentProps & {
    loadingMask?: React.ReactNode;
    tierId?: number;
  }
>;

export const CollectionIfWalletCanMint = ({
  as,
  loadingMask = '...',
  tierId,
  children,
  ...attributes
}: Props) => {
  const {
    data: { canMint },
  } = useCollectionSalesMintingContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && canMint === undefined ? (
        <>{loadingMask}</>
      ) : canMint ? (
        <>{children}</>
      ) : null}
    </Component>
  );
};
