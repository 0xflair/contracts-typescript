import { Button } from '@flair-sdk/react-ui';
import { BigNumberish } from 'ethers';

import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  ticketTokenIds?: BigNumberish[];
};

export const StreamUnstakeButton = ({ className, ticketTokenIds }: Props) => {
  const {
    data: { canUnstake, unstakeableNfts },
    unstake,
  } = useStreamStakingContext();

  const tokensToUnstake = (ticketTokenIds || unstakeableNfts || [])?.length;

  return (
    <Button
      text={tokensToUnstake ? `Un-stake ${tokensToUnstake} NFTs` : `Un-stake`}
      onClick={() => unstake(ticketTokenIds ? { ticketTokenIds } : undefined)}
      disabled={!canUnstake}
      className={className}
    />
  );
};
