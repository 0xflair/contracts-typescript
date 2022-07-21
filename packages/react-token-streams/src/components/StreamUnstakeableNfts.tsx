import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  hideSymbol?: boolean;
};

export const StreamUnstakeableNfts = ({ className, hideSymbol }: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { unstakeableNfts },
  } = useStreamStakingContext();

  return (
    <div className={className}>
      {unstakeableNfts === undefined || unstakeableNfts === null
        ? '...'
        : unstakeableNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </div>
  );
};
