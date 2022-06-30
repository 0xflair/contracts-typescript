import humanizeDuration from 'humanize-duration';

import { useStreamEmissionTimeUnit } from '../hooks/useStreamEmissionTimeUnit';
import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
};

export const StreamEmissionTimeUnit = ({ className }: Props) => {
  const {
    data: { env, chainId, contractAddress },
  } = useStreamClaimingContext();

  const { data: emissionTimeUnit } = useStreamEmissionTimeUnit({
    env,
    chainId,
    contractAddress,
  });

  return (
    <div className={className}>
      every{' '}
      {emissionTimeUnit
        ? humanizeDuration(Number(emissionTimeUnit.toString()) * 1000)
        : '...'}
    </div>
  );
};
