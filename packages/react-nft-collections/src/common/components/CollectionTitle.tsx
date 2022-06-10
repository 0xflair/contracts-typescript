import { useCollectionContext } from '../providers/CollectionProvider';

type Props = {
  className?: string;
};

export const CollectionTitle = ({ className }: Props) => {
  const {
    data: { contractAddress, collection, collectionMetadata },
  } = useCollectionContext();

  return (
    <h1 className={className}>
      {collection?.config?.collectionName ||
        collectionMetadata?.name ||
        contractAddress?.substring(0, 8) ||
        '...'}
    </h1>
  );
};
