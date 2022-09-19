import { Fragment } from 'react';

import { BareComponentProps } from '../../../../common';
import { useCollectionContext } from '../providers/CollectionProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
};

export const CollectionMaxSupply = ({
  as,
  loadingMask = '...',
  ...attributes
}: Props) => {
  const {
    data: { maxSupply },
    isLoading: { maxSupplyLoading },
  } = useCollectionContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && maxSupplyLoading && maxSupply === undefined
        ? loadingMask
        : maxSupply?.toString()}
    </Component>
  );
};
