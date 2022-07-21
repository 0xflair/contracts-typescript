import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
};

export const StreamAccountTotalNfts = ({ className }: Props) => {
  const {
    data: { nfts },
  } = useStreamContext();

  return (
    <div className={className}>
      {nfts === undefined || nfts === null ? '...' : nfts.length}
    </div>
  );
};
