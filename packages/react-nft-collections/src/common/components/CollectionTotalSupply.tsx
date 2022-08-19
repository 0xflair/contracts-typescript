import { useCollectionContext } from '../providers/CollectionProvider';

type Props = {
  loadingMask?: React.ReactNode;
};

export const CollectionTotalSupply = ({ loadingMask = '...' }: Props) => {
  const {
    data: { totalSupply },
  } = useCollectionContext();

  return <>{totalSupply?.toString() || loadingMask}</>;
};
