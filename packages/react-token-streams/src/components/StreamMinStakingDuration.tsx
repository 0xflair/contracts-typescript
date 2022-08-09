import humanizeDuration from 'humanize-duration';

import { useStreamMinStakingDuration } from '../hooks/useStreamMinStakingDuration';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
};

export const StreamMinStakingDuration = ({ className }: Props) => {
  const {
    data: { env, chainId, contractAddress },
  } = useStreamContext();

  const { data: minStakingDuration } = useStreamMinStakingDuration({
    chainId,
    contractAddress,
  });

  return (
    <div className={className}>
      {minStakingDuration
        ? humanizeDuration(Number(minStakingDuration.toString()) * 1000)
        : '...'}
    </div>
  );
};
