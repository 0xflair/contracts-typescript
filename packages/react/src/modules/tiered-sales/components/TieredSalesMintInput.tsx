import { BigNumberish } from 'ethers';

import { useTieredSalesContext } from '../providers';

type Props = {
  className?: string;
  mintCount?: BigNumberish;
  setMintCount: (mintCount: BigNumberish) => void;
};

export const TieredSalesMintInput = ({
  className,
  mintCount = '1',
  setMintCount,
}: Props) => {
  const {
    data: { canMint, eligibleAmount },
  } = useTieredSalesContext();

  const maxAllowedMintCount = Math.min(
    // Number(maxSupply?.toString() || Infinity),
    Number(eligibleAmount?.toString() || Infinity),
  );

  return (
    <input
      type="number"
      required
      min={1}
      max={maxAllowedMintCount || Infinity}
      value={mintCount.toString()}
      disabled={!canMint}
      onChange={(e) => setMintCount(e.target.value)}
      className={className}
    />
  );
};
