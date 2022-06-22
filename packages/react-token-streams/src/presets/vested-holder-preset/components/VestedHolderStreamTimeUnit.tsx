import humanizeDuration from 'humanize-duration';

import { useVestedHolderStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
};

export const VestedHolderStreamTimeUnit = ({ className }: Props) => {
  const {
    data: { vestingTimeUnit },
  } = useVestedHolderStreamClaimingContext();

  return (
    <div className={className}>
      every{' '}
      {vestingTimeUnit
        ? humanizeDuration(Number(vestingTimeUnit.toString()) * 1000)
        : '...'}
    </div>
  );
};
