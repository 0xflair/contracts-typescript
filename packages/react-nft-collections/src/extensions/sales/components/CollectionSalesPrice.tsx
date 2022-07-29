import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
};

export const CollectionSalesPrice = ({ className }: Props) => {
  const {
    data: { price, chainInfo, currentTierId },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className} title={`Tier #${currentTierId?.toString()}`}>
      {price ? (
        <CryptoValue
          symbol={chainInfo?.nativeCurrency?.symbol}
          value={price}
          unit={CryptoUnits.WEI}
        />
      ) : (
        '...'
      )}
    </div>
  );
};
