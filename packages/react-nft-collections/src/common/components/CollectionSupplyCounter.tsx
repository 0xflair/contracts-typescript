import { useCollectionContext } from '../providers/CollectionProvider';

type Props = {
  className?: string;
};

export const CollectionSupplyCounter = ({ className }: Props) => {
  const {
    data: { totalSupply, maxSupply },
  } = useCollectionContext();

  return (
    <div className={className}>
      {totalSupply?.toString() || '...'} / {maxSupply?.toString() || '...'}
    </div>
  );
};
