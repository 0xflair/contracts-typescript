import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BigNumber } from 'ethers';
import { ReactNode } from 'react';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
  showPrice?: boolean;
  showSymbol?: boolean;
  freeElement?: ReactNode;
  mintCount?: number;
};

export const CollectionSalesPrice = ({
  className,
  showPrice = true,
  showSymbol = true,
  freeElement = <>Free</>,
  mintCount = 1,
}: Props) => {
  const {
    data: { price, chainInfo, currentTierId },
    isLoading: { isAutoDetectingTier },
  } = useCollectionSalesMintingContext();

  const mintNo = Number(mintCount || '1');
  const finalPrice =
    price !== undefined && mintCount !== undefined
      ? BigNumber.from(price).mul(mintNo === NaN ? 1 : mintNo)
      : undefined;

  return (
    <div className={className} title={`Tier #${currentTierId?.toString()}`}>
      {finalPrice && !isAutoDetectingTier ? (
        Number(finalPrice.toString()) > 0 ? (
          <CryptoValue
            symbol={chainInfo?.nativeCurrency?.symbol}
            value={finalPrice}
            unit={CryptoUnits.WEI}
            showPrice={showPrice}
            showSymbol={showSymbol}
          />
        ) : (
          freeElement
        )
      ) : (
        '...'
      )}
    </div>
  );
};
