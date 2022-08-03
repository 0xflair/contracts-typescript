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
    data: { prepareData, stakeData, unstakeData },
    error: {
      tokenUnlockingTimesError,
      unlockedNftsError,
      prepareError,
      stakeError,
      unstakeError,
    },
    isLoading: {
      unlockedNftsLoading,
      lockedNftsLoading,
      unstakeableNftsLoading,
      tokenUnlockingTimesLoading,
      prepareLoading,
      stakeLoading,
      unstakeLoading,
    },
  } = useStreamStakingContext();

  return (
    <div className={className}>
      {/* COMMON LOADING */}
      {unlockedNftsLoading ||
      lockedNftsLoading ||
      unstakeableNftsLoading ||
      tokenUnlockingTimesLoading ? (
        <div className="flex items-center gap-2">
          <Spinner /> Loading staking information...
        </div>
      ) : null}

      {/* PREPARING */}
      {prepareLoading && (
        <div className="flex items-center gap-2">
          <Spinner /> {'Preparing...'}
        </div>
      )}
      {prepareData?.txReceipt || prepareData?.txResponse ? (
        <TransactionLink
          txReceipt={prepareData?.txReceipt}
          txResponse={prepareData?.txResponse}
        />
      ) : null}
      {prepareError && <Errors title="Cannot prepare" error={prepareError} />}

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

      {/* COMMON ERRORS */}
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
