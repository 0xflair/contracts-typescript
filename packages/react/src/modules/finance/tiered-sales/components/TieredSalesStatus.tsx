import { Fragment } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  activeContent?: React.ReactNode;
  notActiveContent?: React.ReactNode;
};

export const TieredSalesStatus = ({
  as,
  loadingMask = (
    <span className="rounded-full bg-gray-200 animate-pulse h-5 w-32" />
  ),
  activeContent = (
    <span className="sale-status sale-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
      Sale is active
    </span>
  ),
  notActiveContent = (
    <span className="sale-status sale-not-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
      Sale not active
    </span>
  ),
  ...attributes
}: Props) => {
  const {
    data: { isActive },
    isLoading: { mintLoading, isAutoDetectingTier },
  } = useTieredSalesContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && (isAutoDetectingTier || isActive === undefined) ? (
        <>{loadingMask}</>
      ) : (
        <>
          {isActive ? activeContent : null}
          {!isActive && !mintLoading ? notActiveContent : null}
        </>
      )}
    </Component>
  );
};
