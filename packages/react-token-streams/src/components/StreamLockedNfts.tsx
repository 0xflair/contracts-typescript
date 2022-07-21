import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  hideSymbol?: boolean;
};

export const StreamLockedNfts = ({ className, hideSymbol }: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { lockedNfts },
  } = useStreamStakingContext();

  return (
    <div className={className}>
      {lockedNfts === undefined || lockedNfts === null
        ? '...'
        : lockedNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </div>
  );
};
