import { BigNumberish } from 'ethers';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  children?: React.ReactNode;
  soldOutText?: React.ReactNode;
  mintCount?: BigNumberish;
  className?: string;
};

export const CollectionSalesMintButton = ({
  children = 'Mint',
  soldOutText = 'Sold Out',
  mintCount = '1',
  className,
}: Props) => {
  const {
    data: { canMint, soldOut },
    mint,
  } = useCollectionSalesMintingContext();

  return (
    <button
      className={className}
      onClick={() => mint({ mintCount })}
      disabled={!canMint}
    >
      {soldOut ? soldOutText : children}
    </button>
  );
};
