import { Errors, Spinner, TransactionLink } from '@0xflair/react-ui';

import { useCollectionSalesMintingContext } from '../providers';

type Props = {
  className?: string;
};

export const CollectionSalesMintStatusBar = ({ className }: Props) => {
  const {
    data: { txReceipt, txResponse },
    isLoading: { isAutoDetectingTier, mintLoading },
    error: { mintError, collectionMetadataError },
  } = useCollectionSalesMintingContext();

  return (
    <div className={className}>
      {isAutoDetectingTier ? (
        <div className="flex items-center gap-2">
          <Spinner /> Checking your wallet eligibility...
        </div>
      ) : (
        <>
          {mintLoading && (
            <div className="flex items-center gap-2">
              <Spinner />{' '}
              {txReceipt || txResponse ? 'Minting...' : 'Preparing...'}
            </div>
          )}
          {txReceipt || txResponse ? (
            <TransactionLink txReceipt={txReceipt} txResponse={txResponse} />
          ) : null}
          {/* {collectionError && (
        <Errors
          title="Cannot fetch collection"
          error={collectionError}
        />
      )} */}
          {/* {!metadataLoading && metadataError && (
        <Errors title="Cannot resolve metadata" error={metadataError} />
      )} */}
          {!mintLoading && mintError && (
            <Errors title="Minting error" error={mintError} />
          )}
          {collectionMetadataError && (
            <Errors
              title="Cannot fetch metadata"
              error={collectionMetadataError}
            />
          )}
        </>
      )}
    </div>
  );
};
