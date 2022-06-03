import { Errors, Spinner, TransactionLink } from '@0xflair/react-ui';
import { ReactNode } from 'react';

import { StreamStatusBar } from '../../../common/components';
import { useVestedHolderStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
  separator?: ReactNode;
};

export const VestedHolderStreamStatusBar = ({
  className = 'mt-4 flex flex-col gap-2',
}: Props) => {
  const {
    error: { totalReleasedAmountError, vestingRateError, vestingTimeUnitError },
    isLoading: { totalReleasedAmountLoading },
  } = useVestedHolderStreamClaimingContext();

  return (
    <StreamStatusBar className={className}>
      {totalReleasedAmountLoading ? (
        <div className="flex gap-2">
          <Spinner /> Loading released information...
        </div>
      ) : null}

      {totalReleasedAmountError && (
        <Errors
          title="totalReleasedAmountError"
          error={totalReleasedAmountError}
        />
      )}
      {vestingRateError && (
        <Errors title="vestingRateError" error={vestingRateError} />
      )}
      {vestingTimeUnitError && (
        <Errors title="vestingTimeUnitError" error={vestingTimeUnitError} />
      )}
    </StreamStatusBar>
  );
};
