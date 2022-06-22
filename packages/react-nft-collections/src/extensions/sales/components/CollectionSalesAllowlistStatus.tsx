import { classNames } from '@0xflair/react-common';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
  allowlistedClass?: string;
  notAllowlistedClass?: string;
};

export const CollectionSalesAllowlistStatus = ({
  className,
  allowlistedClass = 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800',
  notAllowlistedClass = 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800',
}: Props) => {
  const {
    data: { preSaleStatus, preSaleIsAllowlisted },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className}>
      {preSaleIsAllowlisted ? (
        <span
          className={classNames(
            'allowlist-status allowlist-status-allowlisted',
            allowlistedClass
          )}
        >
          You are allowlisted for pre-sale
        </span>
      ) : (
        preSaleStatus && (
          <span
            className={classNames(
              'allowlist-status allowlist-status-not-allowlisted',
              notAllowlistedClass
            )}
          >
            You are not allowlisted
          </span>
        )
      )}
    </div>
  );
};
