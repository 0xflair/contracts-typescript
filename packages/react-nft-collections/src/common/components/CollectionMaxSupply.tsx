import { useCollectionContext } from '../providers/CollectionProvider';

type Props = {
  loadingMask?: React.ReactNode;
};

export const CollectionMaxSupply = ({ loadingMask = '...' }: Props) => {
  const {
    data: { maxSupply },
  } = useCollectionContext();

  return <>{maxSupply?.toString() || loadingMask}</>;
};
