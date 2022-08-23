import { Fragment } from 'react';

import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleMaxAllocation } from '../hooks/useTierSaleMaxAllocation';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';
import { BareComponentProps } from '../types';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
};

export const CollectionTierMaxAllocation = ({
  as = Fragment,
  loadingMask = '...',
  tierId,
  ...attributes
}: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data, isLoading } = useTierSaleMaxAllocation({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId !== undefined ? tierId : currentTierId || '0',
  });

  const Component = as;

  return (
    <Component {...attributes}>
      {loadingMask && isLoading && data === undefined ? (
        <>{loadingMask}</>
      ) : (
        data?.toLocaleString()
      )}
    </Component>
  );
};
