import { Fragment } from 'react';

import { BareComponentProps } from '../../extensions';
import { useCollectionContext } from '../providers/CollectionProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
};

export const CollectionMaxSupply = ({
  as = Fragment,
  loadingMask = '...',
  ...attributes
}: Props) => {
  const {
    data: { maxSupply },
    isLoading: { maxSupplyLoading },
  } = useCollectionContext();

  const Component = as;

  return (
    <Component {...attributes}>
      {loadingMask && maxSupplyLoading && maxSupply === undefined
        ? loadingMask
        : maxSupply?.toString()}
    </Component>
  );
};
