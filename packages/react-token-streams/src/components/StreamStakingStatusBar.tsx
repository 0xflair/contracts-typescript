import { Errors, Spinner, TransactionLink } from '@0xflair/react-ui';

import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const StreamStakingStatusBar = ({
  className = 'flex flex-col gap-2',
  children,
}: Props) => {
  const {
    data: { stakeData, unstakeData },
    error: {
      tokenUnlockingTimesError,
      unlockedNftsError,
      stakeError,
      unstakeError,
    },
    isLoading: {
      unlockedNftsLoading,
      lockedNftsLoading,
      unstakeableNftsLoading,
      tokenUnlockingTimesLoading,
      stakeLoading,
      unstakeLoading,
    },
  } = useStreamStakingContext();

  return (
    <div className={className}>
      {/* INIT */}
      {unlockedNftsLoading ||
      lockedNftsLoading ||
      unstakeableNftsLoading ||
      tokenUnlockingTimesLoading ? (
        <div className="flex items-center gap-2">
          <Spinner /> Loading staking information...
        </div>
      ) : null}

      {/* STAKING */}
      {stakeLoading && (
        <div className="flex items-center gap-2">
          <Spinner />{' '}
          {stakeData?.txReceipt || stakeData?.txResponse
            ? 'Staking...'
            : 'Preparing...'}
        </div>
      )}
      {stakeData?.txReceipt || stakeData?.txResponse ? (
        <TransactionLink
          txReceipt={stakeData?.txReceipt}
          txResponse={stakeData?.txResponse}
        />
      ) : null}
      {stakeError && <Errors title="Cannot stake" error={stakeError} />}

      {/* UN-STAKING */}
      {unstakeLoading && (
        <div className="flex items-center gap-2">
          <Spinner />{' '}
          {unstakeData?.txReceipt || unstakeData?.txResponse
            ? 'Un-staking...'
            : 'Preparing...'}
        </div>
      )}
      {unstakeData?.txReceipt || unstakeData?.txResponse ? (
        <TransactionLink
          txReceipt={unstakeData?.txReceipt}
          txResponse={unstakeData?.txResponse}
        />
      ) : null}
      {unstakeError && <Errors title="Cannot unstake" error={unstakeError} />}

      {/* ERRORS */}
      {tokenUnlockingTimesError && (
        <Errors
          title="tokenUnlockingTimesError"
          error={tokenUnlockingTimesError}
        />
      )}
      {unlockedNftsError && (
        <Errors title="unlockedNftsError" error={unlockedNftsError} />
      )}
      {children}
    </div>
  );
};
