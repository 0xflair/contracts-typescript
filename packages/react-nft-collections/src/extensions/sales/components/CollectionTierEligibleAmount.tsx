import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleEligibleAmount } from '../hooks';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';

type Props = {
  className?: string;
  tierId?: number;
};

export const CollectionTierEligibleAmount = ({ className, tierId }: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId },
  } = useCollectionSalesMintingContext();

  const { data: eligibleAmount } = useTierSaleEligibleAmount({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId || currentTierId,
  });

  return (
    <div className={className}>{eligibleAmount?.toLocaleString() || '...'}</div>
  );
};
