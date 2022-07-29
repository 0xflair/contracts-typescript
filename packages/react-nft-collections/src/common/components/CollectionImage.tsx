import { normalizeIpfsUrl } from '@0xflair/ipfs';

import { useCollectionContext } from '../providers/CollectionProvider';

type Props = {
  className?: string;
};

export const CollectionImage = ({ className }: Props) => {
  const {
    data: { collection, collectionMetadata },
  } = useCollectionContext();

  return (
    <img
      src={normalizeIpfsUrl(
        collectionMetadata?.image || collection?.config?.collectionImageUri,
      )}
      className={className}
    />
  );
};
