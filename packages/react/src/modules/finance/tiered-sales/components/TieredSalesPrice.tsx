import { BigNumber } from 'ethers';
import { Fragment, ReactNode } from 'react';

import { BareComponentProps, useChainInfo } from '../../../../common';
import { CryptoUnits, CryptoValue } from '../../../../core/crypto-currency';
import { useTieredSalesContext } from '../providers';

type Props = BareComponentProps & {
  loadingMask?: ReactNode;
  showPrice?: boolean;
  showSymbol?: boolean;
  freeElement?: ReactNode;
  mintCount?: number;
  fractionDigits?: number;
};

export const TieredSalesPrice = ({
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
    data: { chainId, price, currentTierId },
    isLoading: { isAutoDetectingTier },
  } = useTieredSalesContext();

  const chainInfo = useChainInfo(chainId);

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
