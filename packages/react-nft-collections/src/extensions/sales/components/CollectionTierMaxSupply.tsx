import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleMaxSupply } from '../hooks/useTierSaleMaxSupply';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = {
  className?: string;
  tierId?: number;
};

export const CollectionTierMaxSupply = ({ className, tierId }: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data: maxSupply } = useTierSaleMaxSupply({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId || currentTierId,
  });

  return (
    <div className={className}>{maxSupply?.toLocaleString() || '...'}</div>
  );
};
