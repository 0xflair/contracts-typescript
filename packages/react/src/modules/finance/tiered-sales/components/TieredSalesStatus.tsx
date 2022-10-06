import { Fragment } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  soldOutClassName?: string;
  activeClassName?: string;
  notActiveClassName?: string;
};

export const TieredSalesStatus = ({
  as,
  loadingMask = '...',
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
      {loadingMask && isAutoDetectingTier ? (
        <>{loadingMask}</>
      ) : (
        <>
          {isActive ? (
            <span className="sale-status pre-sale pre-sale-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Sale is active
            </span>
          ) : null}
          {!isActive && !mintLoading ? (
            <span className="sale-status sale-not-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Sale not active yet
            </span>
          ) : null}
        </>
      )}
    </Component>
  );
};
