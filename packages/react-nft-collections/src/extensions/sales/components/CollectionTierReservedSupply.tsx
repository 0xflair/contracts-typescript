import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleReservedSupply } from '../hooks';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = {
  className?: string;
  tierId?: number;
};

export const CollectionTierReservedSupply = ({ className, tierId }: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data: reservedSupply } = useTierSaleReservedSupply({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId || currentTierId,
  });

  return (
    <div className={className}>{reservedSupply?.toLocaleString() || '...'}</div>
  );
};
