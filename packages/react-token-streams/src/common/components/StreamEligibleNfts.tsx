import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
};

export const StreamEligibleNfts = ({ className }: Props) => {
  const {
    data: { nfts },
  } = useStreamClaimingContext();

  return (
    <div className={className}>
      {nfts === undefined || nfts === null ? '...' : nfts.length}
    </div>
  );
};
