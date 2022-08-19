import { normalizeIpfsUrl } from '@0xflair/ipfs';

import { useCollectionContext } from '../providers/CollectionProvider';

type Props = {
  loadingMask?: React.ReactNode;
} & React.HTMLAttributes<HTMLImageElement>;

export const CollectionImage = (props: Props) => {
  const {
    data: { collection, collectionMetadata },
    isLoading: { collectionLoading, collectionMetadataLoading },
  } = useCollectionContext();

  return props.loadingMask &&
    (collectionLoading || collectionMetadataLoading) &&
    !collectionMetadata?.image ? (
    <>{props.loadingMask}</>
  ) : (
    <img
      src={normalizeIpfsUrl(
        collectionMetadata?.image || collection?.config?.collectionImageUri,
      )}
      {...props}
    />
  );
};
