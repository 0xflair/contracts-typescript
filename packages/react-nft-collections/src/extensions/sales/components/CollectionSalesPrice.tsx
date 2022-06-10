import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
};

export const CollectionSalesPrice = ({ className }: Props) => {
  const {
    data: { preSaleStatus, preSalePrice, publicSalePrice, chainInfo },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className}>
      {preSaleStatus ? (
        <CryptoValue
          symbol={chainInfo?.nativeCurrency?.symbol}
          value={preSalePrice}
          unit={CryptoUnits.WEI}
        />
      ) : publicSalePrice ? (
        <CryptoValue
          symbol={chainInfo?.nativeCurrency?.symbol}
          value={publicSalePrice}
          unit={CryptoUnits.WEI}
        />
      ) : (
        '...'
      )}
    </div>
  );
};
