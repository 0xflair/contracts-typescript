import humanizeDuration from 'humanize-duration';

import { useStreamTotalStakedDurations } from '../hooks/useStreamTotalStakedDurations';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
};

export const StreamTotalStakedDurations = ({ className }: Props) => {
  const {
    data: { env, chainId, contractAddress, ticketTokenIds },
  } = useStreamContext();

  const { data: totalDurations } = useStreamTotalStakedDurations({
    env,
    chainId,
    contractAddress,
    args: { ticketTokenIds },
    enabled: Boolean(ticketTokenIds && ticketTokenIds.length > 0),
  });

  return (
    <span className={className}>
      ~
      {totalDurations
        ? humanizeDuration(Number(totalDurations.toString()) * 1000, {
            largest: 2,
          })
        : '...'}
    </span>
  );
};
