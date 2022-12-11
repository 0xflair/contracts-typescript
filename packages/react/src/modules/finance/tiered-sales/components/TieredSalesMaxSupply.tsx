import { BigNumberish } from 'ethers';
import { Fragment } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesMaxSupply } from '../hooks/useTieredSalesMaxSupply';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: BigNumberish;
};

export const TieredSalesMaxSupply = ({
  as,
  loadingMask = '...',
  tierId,
  ...attributes
}: Props) => {
  const {
    data: { chainId, contractAddress, currentTierId },
  } = useTieredSalesContext();

  const { data, isLoading } = useTieredSalesMaxSupply({
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
