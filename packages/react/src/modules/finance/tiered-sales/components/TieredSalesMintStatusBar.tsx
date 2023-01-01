import { useAccount } from 'wagmi';

import { IfChain } from '../../../../core';
import { Errors, Spinner, TransactionLink } from '../../../../core/ui';
import { useTieredSalesContext } from '../providers';

type Props = {
  className?: string;
};

export const TieredSalesMintStatusBar = ({ className }: Props) => {
  const { isConnected } = useAccount();
  const {
    data: {
      chainId,
      mintReceipt,
      mintResponse,
      approveReceipt,
      approveResponse,
    },
    isLoading: {
      isAutoDetectingTier,
      tiersLoading,
      mintLoading,
      allowanceLoading,
      approveLoading,
    },
    error: { approveError, mintError, allowanceError },
  } = useTieredSalesContext();

  return (
    <div className={className}>
      {isAutoDetectingTier || tiersLoading ? (
        isConnected ? (
          <>
            <div className="flex items-center gap-2">
              <Spinner /> Checking your wallet eligibility...
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Spinner /> Getting sales information...
            </div>
          </>
        )
      ) : isConnected ? (
        <>
          {mintLoading ? (
            <div className="flex items-center gap-2">
              <Spinner />{' '}
              {mintReceipt || mintResponse
                ? 'Minting...'
                : 'Approve in wallet...'}
            </div>
          ) : allowanceLoading ? (
            <div className="flex items-center gap-2">
              <Spinner /> Checking allowance...
            </div>
          ) : approveLoading ? (
            <div className="flex items-center gap-2">
              <Spinner />
              {mintReceipt || mintResponse
                ? 'Approving...'
                : 'Approve in your wallet...'}
            </div>
          ) : mintReceipt || mintResponse ? (
            <TransactionLink
              txReceipt={mintReceipt}
              txResponse={mintResponse}
            />
          ) : approveReceipt || approveResponse ? (
            <TransactionLink
              txReceipt={approveReceipt}
              txResponse={approveResponse}
            />
          ) : null}

          <IfChain connectedTo={chainId}>
            {!mintLoading && mintError && (
              <Errors title="Cannot mint" error={mintError} />
            )}
            {!approveLoading && approveError && (
              <Errors title="Cannot approve" error={approveError} />
            )}
            {!allowanceLoading && allowanceError && (
              <Errors title="Cannot check allowance" error={allowanceError} />
            )}
          </IfChain>
        </>
      ) : null}
    </div>
  );
};
