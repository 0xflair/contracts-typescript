import { Errors, Spinner, TransactionLink } from '@0xflair/react-ui';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const StreamStatusBar = ({
  className = 'mt-4 flex flex-col gap-2',
  children,
}: Props) => {
  const {
    data: { txReceipt, txResponse },
    error: { streamError, totalClaimableAmountError, claimError, nftsError },
    isLoading: {
      nftsLoading,
      totalClaimedAmountLoading,
      totalClaimableAmountLoading,
      claimLoading,
    },
  } = useStreamClaimingContext();

  return (
    <div className={className}>
      {nftsLoading && (
        <div className="flex gap-2">
          <Spinner /> Loading your NFTs...
        </div>
      )}
      {totalClaimedAmountLoading || totalClaimableAmountLoading ? (
        <div className="flex gap-2">
          <Spinner /> Loading claiming information...
        </div>
      ) : null}
      {claimLoading && (
        <div className="flex gap-2">
          <Spinner /> {txReceipt || txResponse ? 'Claiming...' : 'Preparing...'}
        </div>
      )}
      {txReceipt || txResponse ? (
        <TransactionLink txReceipt={txReceipt} txResponse={txResponse} />
      ) : null}
      {claimError && <Errors title="Cannot claim" error={claimError} />}
      {streamError && <Errors title="streamError" error={streamError} />}
      {totalClaimableAmountError && (
        <Errors
          title="totalClaimableAmountError"
          error={totalClaimableAmountError}
        />
      )}
      {nftsError && <Errors title="nftsError" error={nftsError} />}
      {children}
    </div>
  );
};
