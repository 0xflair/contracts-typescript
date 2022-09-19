import { BigNumber } from 'ethers';
import { Fragment, ReactNode } from 'react';

import { BareComponentProps } from '../../../../common';
import { CryptoUnits, CryptoValue } from '../../../../crypto-currency';
import { useCollectionSalesMintingContext } from '../providers';

type Props = BareComponentProps & {
  loadingMask?: ReactNode;
  showPrice?: boolean;
  showSymbol?: boolean;
  freeElement?: ReactNode;
  mintCount?: number;
  fractionDigits?: number;
};

export const CollectionSalesPrice = ({
  as,
  loadingMask = '...',
  showPrice = true,
  showSymbol = true,
  freeElement = <>Free</>,
  mintCount = 1,
  fractionDigits,
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

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {finalPrice !== undefined && !isAutoDetectingTier ? (
        Number(finalPrice.toString()) > 0 || !freeElement ? (
          <CryptoValue
            symbol={chainInfo?.nativeCurrency?.symbol}
            value={finalPrice}
            unit={CryptoUnits.WEI}
            showPrice={showPrice}
            showSymbol={showSymbol}
            fractionDigits={fractionDigits}
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
