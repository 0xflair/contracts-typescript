import { BigNumberish } from 'ethers';
import { PropsWithChildren } from 'react';

import { useCollectionSalesMintingContext } from '../providers';
import { BareComponentProps } from '../types';

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

  const Component = as;

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
