import { Fragment } from 'react';

import { BareComponentProps } from '../../../common';
import { useTieredSalesTotalMinted } from '../hooks/useTieredSalesTotalMinted';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
};

export const TieredSalesTotalMinted = ({
  as,
  loadingMask = '...',
  tierId,
  ...attributes
}: Props) => {
  const {
    data: { chainId, contractAddress, currentTierId },
  } = useTieredSalesContext();

  const { data, isLoading } = useTieredSalesTotalMinted({
    chainId,
    contractAddress,
    tierId: tierId !== undefined ? tierId : currentTierId || '0',
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

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