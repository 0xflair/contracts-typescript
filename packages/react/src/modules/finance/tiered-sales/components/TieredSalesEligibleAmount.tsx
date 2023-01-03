import { Fragment } from 'react';

import { BareComponentProps } from '../../../../common';
import { CryptoValue } from '../../../../core';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
};

export const TieredSalesEligibleAmount = ({
  as,
  loadingMask = '...',
  tierId,
  ...attributes
}: Props) => {
  const {
    data: { currentTierId, tiers, contractDecimals },
    isLoading: { isAutoDetectingTier, tiersLoading },
  } = useTieredSalesContext();
  const resolvedTierId = Number(
    tierId !== undefined ? tierId : currentTierId || '0',
  );
  const eligibleAmount = tiers?.[resolvedTierId]
    ? tiers[resolvedTierId].eligibleAmount
    : undefined;

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask &&
      (isAutoDetectingTier || tiersLoading) &&
      eligibleAmount == undefined ? (
        <>{loadingMask}</>
      ) : !contractDecimals ? (
        eligibleAmount?.toLocaleString()
      ) : (
        <CryptoValue
          decimals={contractDecimals}
          formatted={false}
          value={eligibleAmount}
          showPrice={false}
          showSymbol={false}
        />
      )}
    </Component>
  );
};
