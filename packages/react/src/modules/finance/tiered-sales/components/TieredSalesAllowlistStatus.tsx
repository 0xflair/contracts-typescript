import { Fragment, ReactNode } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers';

type Props = BareComponentProps & {
  loadingMask?: ReactNode;
  allowlistedContent?: ReactNode;
  notAllowlistedContent?: ReactNode;
  allowlistNotConfiguredContent?: ReactNode;
};

export const TieredSalesAllowlistStatus = ({
  as,
  loadingMask = (
    <span className="rounded-full bg-gray-200 animate-pulse h-5 w-32" />
  ),
  allowlistedContent = (
    <span className="allowlist-status allowlist-status-allowlisted inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
      You are allowlisted
    </span>
  ),
  notAllowlistedContent = (
    <span className="allowlist-status allowlist-status-not-allowlisted inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
      You are not allowlisted
    </span>
  ),
  allowlistNotConfiguredContent = <></>,
  ...attributes
}: Props) => {
  const {
    data: { hasAllowlist, isAllowlisted },
    isLoading: { isAutoDetectingTier, tiersLoading, mintLoading },
  } = useTieredSalesContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask &&
      (isAutoDetectingTier ||
        tiersLoading ||
        (mintLoading &&
          hasAllowlist === undefined &&
          isAllowlisted === undefined)) ? (
        loadingMask
      ) : (
        <>
          {hasAllowlist
            ? isAllowlisted
              ? allowlistedContent
              : notAllowlistedContent
            : allowlistNotConfiguredContent}
        </>
      )}
    </Component>
  );
};
