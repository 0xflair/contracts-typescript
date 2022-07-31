import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
  showPrice?: boolean;
};

export const CollectionSalesPrice = ({
  className,
  showPrice = true,
}: Props) => {
  const {
    data: { price, chainInfo, currentTierId },
    isLoading: { isAutoDetectingTier },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className} title={`Tier #${currentTierId?.toString()}`}>
      {price && !isAutoDetectingTier ? (
        <CryptoValue
          symbol={chainInfo?.nativeCurrency?.symbol}
          value={price}
          unit={CryptoUnits.WEI}
          showPrice={showPrice}
        />
      ) : (
        '...'
      )}
    </div>
  );
};
