import { useEffect } from 'react';

import { useTieredSalesContext } from '../providers';

type Props = {
  className?: string;
};

export const TieredSalesMintInput = ({ className }: Props) => {
  const {
    data: { canMint, eligibleAmount, mintCount },
    setMintCount,
  } = useTieredSalesContext();

  const maxAllowedMintCount = Math.min(
    Number(eligibleAmount?.toString() || Infinity),
  );

  useEffect(() => {
    if (
      mintCount &&
      maxAllowedMintCount &&
      Number(mintCount) > maxAllowedMintCount
    ) {
      setMintCount(maxAllowedMintCount);
    }
  }, [maxAllowedMintCount, mintCount, setMintCount]);

  return (
    <input
      type="number"
      required
      min={1}
      max={maxAllowedMintCount || Infinity}
      value={mintCount?.toString()}
      disabled={!canMint}
      onChange={(e) => setMintCount(e.target.value)}
      className={className}
    />
  );
};
