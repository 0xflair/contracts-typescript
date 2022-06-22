import { BigNumberish } from 'ethers';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  children?: React.ReactNode;
  mintCount?: BigNumberish;
  className?: string;
};

export const CollectionSalesMintButton = ({
  children = 'Mint',
  mintCount = '1',
  className,
}: Props) => {
  const {
    data: { canMint },
    mint,
  } = useCollectionSalesMintingContext();

  return (
    <button
      className={className}
      onClick={() => mint({ mintCount })}
      disabled={!canMint}
    >
      {children}
    </button>
  );
};
