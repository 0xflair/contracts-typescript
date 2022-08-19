import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleMaxAllocation } from '../hooks/useTierSaleMaxAllocation';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = {
  loadingMask?: React.ReactNode;
  tierId?: number;
};

export const CollectionTierMaxAllocation = ({ loadingMask, tierId }: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data: maxAllocation } = useTierSaleMaxAllocation({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId || currentTierId,
  });

  return <>{maxAllocation?.toLocaleString() || loadingMask}</>;
};
