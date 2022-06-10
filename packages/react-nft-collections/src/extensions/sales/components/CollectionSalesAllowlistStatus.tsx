import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
};

export const CollectionSalesAllowlistStatus = ({ className }: Props) => {
  const {
    data: { preSaleStatus, preSaleIsAllowlisted },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className}>
      {preSaleIsAllowlisted ? (
        <span className="allowlist-status allowlist-status-allowlisted inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
          You are allowlisted for pre-sale
        </span>
      ) : (
        preSaleStatus && (
          <span className="allowlist-status allowlist-status-not-allowlisted inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            You are not allowlisted
          </span>
        )
      )}
    </div>
  );
};
