import { BareComponentProps } from '@0xflair/react-common';
import { Fragment, ReactNode } from 'react';

import { useCollectionSalesMintingContext } from '../providers';

type Props = BareComponentProps & {
  loadingMask?: ReactNode;
  allowlistedContent?: ReactNode;
  notAllowlistedContent?: ReactNode;
  allowlistNotConfiguredContent?: ReactNode;
};

export const CollectionSalesAllowlistStatus = ({
  as = Fragment,
  loadingMask = '...',
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
  } = useCollectionSalesMintingContext();

  const Component = as;

  return (
    <Component {...attributes}>
      {loadingMask &&
      (isAutoDetectingTier || tiersLoading || mintLoading) &&
      hasAllowlist === undefined &&
      isAllowlisted === undefined ? (
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
