import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  hideSymbol?: boolean;
};

export const StreamUnlockedNfts = ({ className, hideSymbol }: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { unlockedNfts },
  } = useStreamStakingContext();

  return (
    <div className={className}>
      {unlockedNfts === undefined || unlockedNfts === null
        ? '...'
        : unlockedNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </div>
  );
};
