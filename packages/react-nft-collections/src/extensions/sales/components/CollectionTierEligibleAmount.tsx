import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
};

export const CollectionTierEligibleAmount = ({
  as = Fragment,
  loadingMask = '...',
  tierId,
  ...attributes
}: Props) => {
  const {
    data: { currentTierId, tiers },
    isLoading: { isAutoDetectingTier, tiersLoading },
  } = useCollectionSalesMintingContext();
  const resolvedTierId = Number(
    tierId !== undefined ? tierId : currentTierId || '0',
  );
  const eligibleAmount = tiers?.[resolvedTierId]
    ? tiers[resolvedTierId].eligibleAmount
    : undefined;

  const Component = as;

  return (
    <Component {...attributes}>
      {loadingMask &&
      (isAutoDetectingTier || tiersLoading) &&
      eligibleAmount == undefined ? (
        <>{loadingMask}</>
      ) : (
        eligibleAmount?.toLocaleString()
      )}
    </Component>
  );
};
