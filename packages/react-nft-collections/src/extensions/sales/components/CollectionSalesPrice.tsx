import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { ReactNode } from 'react';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
  showPrice?: boolean;
  freeElement?: ReactNode;
};

export const CollectionSalesPrice = ({
  className,
  showPrice = true,
  freeElement = <>Free</>,
}: Props) => {
  const {
    data: { price, chainInfo, currentTierId },
    isLoading: { isAutoDetectingTier },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className} title={`Tier #${currentTierId?.toString()}`}>
      {price && !isAutoDetectingTier ? (
        Number(price.toString()) > 0 ? (
          <CryptoValue
            symbol={chainInfo?.nativeCurrency?.symbol}
            value={price}
            unit={CryptoUnits.WEI}
            showPrice={showPrice}
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
