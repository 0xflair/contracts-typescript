import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  hideSymbol?: boolean;
};

export const StreamStakedNfts = ({ className, hideSymbol }: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { stakedNfts },
  } = useStreamStakingContext();

  return (
    <div className={className}>
      {stakedNfts === undefined || stakedNfts === null
        ? '...'
        : stakedNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </div>
  );
};
