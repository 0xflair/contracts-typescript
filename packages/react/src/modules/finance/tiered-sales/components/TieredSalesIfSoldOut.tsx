import { BigNumber } from 'ethers';
import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesMaxAllocation } from '../hooks/useTieredSalesMaxAllocation';
import { useTieredSalesTotalMinted } from '../hooks/useTieredSalesTotalMinted';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = PropsWithChildren<
  BareComponentProps & {
    tierId?: number;
  }
>;

export const TieredSalesIfSoldOut = ({
  as,
  tierId,
  children,
  ...attributes
}: Props) => {
  const {
    data: { chainId, contractAddress, currentTierId },
  } = useTieredSalesContext();

  const totalMinted = useTieredSalesTotalMinted({
    chainId,
    contractAddress,
    tierId: tierId !== undefined ? tierId : currentTierId || '0',
  });

  const maxAllocation = useTieredSalesMaxAllocation({
    chainId,
    contractAddress,
    tierId: tierId !== undefined ? tierId : currentTierId || '0',
  });

  const isSoldOut =
    totalMinted &&
    !totalMinted.isLoading &&
    maxAllocation &&
    !maxAllocation.isLoading
      ? BigNumber.from(totalMinted.data).gte(BigNumber.from(maxAllocation.data))
      : undefined;

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return <Component {...attributes}>{isSoldOut ? children : null}</Component>;
};
