import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BigNumber } from 'ethers';
import { Fragment, ReactNode } from 'react';

import { useCollectionSalesMintingContext } from '../providers';
import { BareComponentProps } from '../types';

type Props = BareComponentProps & {
  loadingMask?: ReactNode;
  showPrice?: boolean;
  showSymbol?: boolean;
  freeElement?: ReactNode;
  mintCount?: number;
};

export const CollectionSalesPrice = ({
  as = Fragment,
  loadingMask = '...',
  showPrice = true,
  showSymbol = true,
  freeElement = <>Free</>,
  mintCount = 1,
  ...attributes
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

  const Component = as;

  return (
    <Component {...attributes}>
      {finalPrice !== undefined && !isAutoDetectingTier ? (
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
        loadingMask
      )}
    </Component>
  );
};
