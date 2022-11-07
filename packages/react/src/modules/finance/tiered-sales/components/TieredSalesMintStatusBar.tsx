import { useAccount } from 'wagmi';

import { Errors, Spinner, TransactionLink } from '../../../../core/ui';
import { useTieredSalesContext } from '../providers';

type Props = {
  className?: string;
};

export const TieredSalesMintStatusBar = ({ className }: Props) => {
  const { isConnected } = useAccount();
  const {
    data: { txReceipt, txResponse },
    isLoading: { isAutoDetectingTier, tiersLoading, mintLoading },
    error: { mintError },
  } = useTieredSalesContext();

  return (
    <div className={className}>
      {isAutoDetectingTier || tiersLoading ? (
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
          {isConnected && !mintLoading && mintError && (
            <Errors title="Cannot mint" error={mintError} />
          )}
        </>
      )}
    </div>
  );
};
