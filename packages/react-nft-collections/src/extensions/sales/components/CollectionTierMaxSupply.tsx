import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleMaxSupply } from '../hooks/useTierSaleMaxSupply';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
};

export const CollectionTierMaxSupply = ({
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

  const { data, isLoading } = useTierSaleMaxSupply({
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