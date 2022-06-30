import { BigNumberish } from 'ethers';

import { useStreamShares } from '../hooks/useStreamShares';
import { useStreamTotalShares } from '../hooks/useStreamTotalShares';
import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
  ticketTokenIds?: BigNumberish[];
};

export const StreamSharesPercentage = ({
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
    shares?.reduce<number>((acc: any, curr: any) => {
      return Number(acc) + Number(curr);
    }, 0) || 0;

  const percentage = (sumOfShares / Number(totalShares?.toString() || 1)) * 100;

  return <span className={className}>{percentage}%</span>;
};
