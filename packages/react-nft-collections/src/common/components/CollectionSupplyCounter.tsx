import { Fragment } from 'react';

import { BareComponentProps } from '../../extensions';
import { useCollectionContext } from '../providers/CollectionProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  separator?: React.ReactNode;
};

export const CollectionSupplyCounter = ({
  as = Fragment,
  loadingMask,
  separator = <>&nbsp;/&nbsp;</>,
  ...attributes
}: Props) => {
  const {
    data: { totalSupply, maxSupply },
    isLoading: { maxSupplyLoading, totalSupplyLoading },
  } = useCollectionContext();

  const Component = as;

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
