import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

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

  const [localValue, setLocalValue] = useState(mintCount?.toString() || '');

  useEffect(() => {
    if (
      mintCount &&
      maxAllowedMintCount &&
      Number(mintCount) > maxAllowedMintCount
    ) {
      setMintCount(maxAllowedMintCount);
    }
  }, [maxAllowedMintCount, mintCount, setMintCount]);

  useDebounce(
    () => {
      setLocalValue(mintCount?.toString() || '');
    },
    1000,
    [mintCount],
  );
  useDebounce(
    () => {
      setMintCount(localValue);
    },
    300,
    [localValue],
  );

  return (
    <input
      type="number"
      required
      min={1}
      max={maxAllowedMintCount || Infinity}
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value);
      }}
      onBlur={(e) => {
        setMintCount(e.target.value);
      }}
      className={className}
    />
  );
};
