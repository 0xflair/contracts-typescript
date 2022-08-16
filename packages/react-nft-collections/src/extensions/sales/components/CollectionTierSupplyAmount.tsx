import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleTotalSupply } from '../hooks/useTierSaleTotalSupply';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = {
  className?: string;
  tierId?: number;
};

export const CollectionTierSupplyAmount = ({ className, tierId }: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data: totalSupply } = useTierSaleTotalSupply({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId || currentTierId,
  });

  return (
    <div className={className}>{totalSupply?.toLocaleString() || '...'}</div>
  );
};
