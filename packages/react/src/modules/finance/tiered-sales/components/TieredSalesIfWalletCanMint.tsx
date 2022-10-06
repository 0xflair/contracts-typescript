import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = PropsWithChildren<
  BareComponentProps & {
    loadingMask?: React.ReactNode;
    tierId?: number;
  }
>;

export const TieredSalesIfWalletCanMint = ({
  as,
  loadingMask = '...',
  tierId,
  children,
  ...attributes
}: Props) => {
  const {
    data: { canMint },
  } = useTieredSalesContext();

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
