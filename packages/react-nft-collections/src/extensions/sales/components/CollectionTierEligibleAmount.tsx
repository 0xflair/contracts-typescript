import { BareComponentProps } from '@flair-sdk/react-common';
import { Fragment } from 'react';

import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
};

export const CollectionTierEligibleAmount = ({
  as,
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

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

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
