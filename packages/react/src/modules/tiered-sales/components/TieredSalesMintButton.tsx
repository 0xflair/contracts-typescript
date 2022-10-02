import { BigNumberish } from 'ethers';
import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../common';
import { useTieredSalesContext } from '../providers';

type Props = PropsWithChildren<BareComponentProps> & {
  soldOutContent?: React.ReactNode;
  mintCount?: BigNumberish;
};

export const TieredSalesMintButton = ({
  as = 'button',
  children = 'Mint',
  mintCount = 1,
  ...attributes
}: Props) => {
  const {
    data: { canMint },
    mint,
  } = useTieredSalesContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component
      onClick={() => mint?.({ mintCount })}
      disabled={!canMint || !mint}
      {...attributes}
    >
      {children}
    </Component>
  );
};
