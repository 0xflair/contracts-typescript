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
      {collectionMetadata?.name ||
        collection?.config?.collectionName ||
        contractAddress?.substring(0, 8) ||
        '...'}
    </h1>
  );
};
