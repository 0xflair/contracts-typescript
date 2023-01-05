import { BigNumber } from 'ethers';
import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesMaxAllocation } from '../hooks/useTieredSalesMaxAllocation';
import { useTieredSalesTotalMinted } from '../hooks/useTieredSalesTotalMinted';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = PropsWithChildren<
  BareComponentProps & {
    tierId?: number;
    loadingMask?: React.ReactNode;
  }
>;

export const TieredSalesIfSoldOut = ({
  as,
  tierId,
  loadingMask = <>...</>,
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
    maxAllocation?.data && totalMinted?.data
      ? BigNumber.from(totalMinted?.data).gte(
          BigNumber.from(maxAllocation?.data),
        )
      : undefined;

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  const isLoading =
    totalMinted.isLoading ||
    totalMinted.isFetching ||
    totalMinted.isRefetching ||
    maxAllocation.isLoading ||
    maxAllocation.isFetching ||
    maxAllocation.isRefetching;

  return (
    <Component {...attributes}>
      {loadingMask &&
      isLoading &&
      (maxAllocation?.data === undefined || totalMinted?.data === undefined) ? (
        <>{loadingMask}</>
      ) : isSoldOut === true ? (
        children
      ) : null}
    </Component>
  );
};
