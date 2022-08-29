import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useCollectionContext } from '../providers/CollectionProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  separator?: React.ReactNode;
};

export const CollectionSupplyCounter = ({
  as,
  loadingMask,
  separator = <>&nbsp;/&nbsp;</>,
  ...attributes
}: Props) => {
  const {
    data: { totalSupply, maxSupply },
    isLoading: { maxSupplyLoading, totalSupplyLoading },
  } = useCollectionContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask &&
      (maxSupplyLoading || totalSupplyLoading) &&
      (totalSupply === undefined || maxSupply === undefined) ? (
        loadingMask
      ) : (
        <>
          {totalSupply?.toString()}
          {separator}
          {maxSupply?.toString()}
        </>
      )}
    </Component>
  );
};
