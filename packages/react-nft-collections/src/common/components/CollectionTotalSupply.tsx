import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useCollectionContext } from '../providers/CollectionProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
};

export const CollectionTotalSupply = ({
  as,
  loadingMask = '...',
  ...attributes
}: Props) => {
  const {
    data: { totalSupply },
    isLoading: { totalSupplyLoading },
  } = useCollectionContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && totalSupplyLoading && totalSupply === undefined
        ? loadingMask
        : totalSupply?.toString()}
    </Component>
  );
};
