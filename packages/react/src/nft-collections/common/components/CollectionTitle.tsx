import { Fragment } from 'react';

import { BareComponentProps } from '../../../common';
import { useCollectionContext } from '../providers/CollectionProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
};

export const CollectionTitle = ({
  as,
  loadingMask = '...',
  ...attributes
}: Props) => {
  const {
    data: { collection, collectionMetadata },
    isLoading: { collectionLoading, collectionMetadataLoading },
  } = useCollectionContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask &&
      (collectionLoading || collectionMetadataLoading) &&
      !collectionMetadata?.name
        ? loadingMask
        : collectionMetadata?.name || collection?.config?.collectionName}
    </Component>
  );
};
