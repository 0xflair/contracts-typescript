import { BigNumberish } from 'ethers';

import { useStreamShares } from '../hooks/useStreamShares';
import { useStreamTotalShares } from '../hooks/useStreamTotalShares';
import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
  ticketTokenIds?: BigNumberish[];
};

export const StreamSharesAllocation = ({
  className,
  ticketTokenIds,
}: Props) => {
  const {
    data: {
      env,
      chainId,
      contractAddress,
      currentClaimTokenSymbol,
      ticketTokenIds: accountTicketTokenIds,
    },
  } = useStreamClaimingContext();

  const {
    data: shares,
    isLoading: sharesLoading,
    error: sharesError,
  } = useStreamShares({
    env,
    chainId,
    contractAddress,
    args: {
      ticketTokenIds: ticketTokenIds || accountTicketTokenIds,
    },
  });

  const {
    data: totalShares,
    isLoading: totalSharesLoading,
    error: totalSharesError,
  } = useStreamTotalShares({
    chainId,
    contractAddress,
  });

  const sumOfShares =
    shares?.reduce<number>((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0) || 0;

  return (
    <span className={className}>
      {sumOfShares?.toString()} / {totalShares?.toString()}
    </span>
  );
};
