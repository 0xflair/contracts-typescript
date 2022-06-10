import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
};

export const CollectionSalesActiveStatus = ({ className }: Props) => {
  const {
    data: { preSaleStatus, publicSaleStatus },
    isLoading: { mintLoading },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className}>
      {preSaleStatus ? (
        <span className="sale-status pre-sale pre-sale-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Pre-sale is active
        </span>
      ) : null}
      {publicSaleStatus ? (
        <span className="sale-status public-sale public-sale-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Public-sale is active
        </span>
      ) : null}
      {!preSaleStatus && !publicSaleStatus && !mintLoading ? (
        <span className="sale-status sale-not-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          Sale not active yet
        </span>
      ) : null}
    </div>
  );
};
