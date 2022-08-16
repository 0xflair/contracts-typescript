import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleRemaining } from '../hooks/useTierSaleRemaining';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = {
  className?: string;
  tierId?: number;
};

export const CollectionTierRemainingAmount = ({ className, tierId }: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data: totalRemaining } = useTierSaleRemaining({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId || currentTierId,
  });

  return (
    <div className={className}>{totalRemaining?.toLocaleString() || '...'}</div>
  );
};
