import { BigNumberish } from 'ethers';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
  mintCount?: BigNumberish;
  setMintCount: (mintCount: BigNumberish) => void;
};

export const CollectionSalesMintInput = ({
  className,
  mintCount = '1',
  setMintCount,
}: Props) => {
  const {
    data: { canMint, maxSupply, eligibleAmount },
  } = useCollectionSalesMintingContext();

  const maxAllowedMintCount = Math.min(
    Number(maxSupply?.toString() || Infinity),
    Number(eligibleAmount?.toString() || Infinity),
  );

  return (
    <input
      type="number"
      required
      min={1}
      max={maxAllowedMintCount}
      value={mintCount.toString()}
      disabled={!canMint}
      onChange={(e) => setMintCount(e.target.value)}
      className={className}
    />
  );
};
