import { useCollectionContext } from '../providers/CollectionProvider';

type Props = {
  className?: string;
};

export const CollectionSupplyStat = ({ className }: Props) => {
  const {
    data: { totalSupply, maxSupply },
  } = useCollectionContext();

  return (
    <div className={className}>
      {totalSupply?.toString() || '...'} / {maxSupply?.toString() || '...'}
    </div>
  );
};
