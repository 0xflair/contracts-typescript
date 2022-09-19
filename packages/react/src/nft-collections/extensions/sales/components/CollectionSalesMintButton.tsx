import { BigNumberish } from 'ethers';
import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useCollectionSalesMintingContext } from '../providers';

type Props = PropsWithChildren<BareComponentProps> & {
  soldOutContent?: React.ReactNode;
  mintCount?: BigNumberish;
};

export const CollectionSalesMintButton = ({
  as = 'button',
  children = 'Mint',
  soldOutContent = 'Sold Out',
  mintCount = 1,
  ...attributes
}: Props) => {
  const {
    data: { canMint, soldOut },
    mint,
  } = useCollectionSalesMintingContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component
      onClick={() => mint({ mintCount })}
      disabled={!canMint}
      {...attributes}
    >
      {soldOut && soldOutContent ? soldOutContent : children}
    </Component>
  );
};
