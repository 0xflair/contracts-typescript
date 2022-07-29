import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
};

export const CollectionSalesActiveStatus = ({ className }: Props) => {
  const {
    data: { isActive, soldOut },
    isLoading: { mintLoading },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className}>
      {soldOut ? (
        <span className="sale-status sold-out inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          Sold out
        </span>
      ) : null}
      {!soldOut && isActive ? (
        <span className="sale-status pre-sale pre-sale-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Sale is active
        </span>
      ) : null}
      {!soldOut && !isActive && !mintLoading ? (
        <span className="sale-status sale-not-active inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          Sale not active yet
        </span>
      ) : null}
    </div>
  );
};
