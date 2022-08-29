import { BareComponentProps } from '@0xflair/react-common';
import { Errors, Spinner, TransactionLink } from '@0xflair/react-ui';
import { Fragment, PropsWithChildren } from 'react';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';

type Props = PropsWithChildren<BareComponentProps>;

export const StreamClaimingStatusBar = ({
  as,
  children,
  ...attributes
}: Props) => {
  const {
    data: { txReceipt, txResponse },
    error: {
      totalClaimableAmountByAccountError,
      totalClaimedAmountByAccountError,
      totalClaimedOverallError,
      claimError,
    },
    isLoading: {
      totalClaimedAmountByAccountLoading,
      totalClaimableAmountByAccountLoading,
      totalClaimedOverallLoading,
      claimLoading,
    },
  } = useStreamClaimingContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {totalClaimedAmountByAccountLoading ||
      totalClaimableAmountByAccountLoading ||
      totalClaimedOverallLoading ? (
        <div className="flex items-center gap-2">
          <Spinner /> Loading claiming information...
        </div>
      ) : null}
      {claimLoading && (
        <div className="flex items-center gap-2">
          <Spinner /> {txReceipt || txResponse ? 'Claiming...' : 'Preparing...'}
        </div>
      )}
      {txReceipt || txResponse ? (
        <TransactionLink txReceipt={txReceipt} txResponse={txResponse} />
      ) : null}
      {claimError && <Errors title="Cannot claim" error={claimError} />}
      {totalClaimableAmountByAccountError && (
        <Errors
          title="totalClaimableAmountByAccountError"
          error={totalClaimableAmountByAccountError}
        />
      )}
      {totalClaimedAmountByAccountError && (
        <Errors
          title="totalClaimedAmountByAccountError"
          error={totalClaimedAmountByAccountError}
        />
      )}
      {totalClaimedOverallError && (
        <Errors
          title="totalClaimedOverallError"
          error={totalClaimedOverallError}
        />
      )}
      {children}
    </Component>
  );
};
