import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleRemainingSupply } from '../hooks/useTierSaleRemainingSupply';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = {
  className?: string;
  tierId?: number;
};

export const CollectionTierRemainingSupply = ({ className, tierId }: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data: totalRemaining } = useTierSaleRemainingSupply({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId || currentTierId,
  });

  return (
    <div className={className}>{totalRemaining?.toLocaleString() || '...'}</div>
  );
};
