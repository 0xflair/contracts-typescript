import { Button } from '@0xflair/react-ui';
import { BigNumberish, BytesLike } from 'ethers';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  ticketTokenIds?: BigNumberish[];
};

export const StreamStakeButton = ({ className, ticketTokenIds }: Props) => {
  const {
    data: { canStake, unlockedNfts },
    stake,
  } = useStreamStakingContext();

  const tokensToStake = (ticketTokenIds || unlockedNfts || [])?.length;

  return (
    <Button
      text={tokensToStake ? `Stake ${tokensToStake} NFTs` : `Stake`}
      onClick={() => stake({ ticketTokenIds })}
      disabled={!canStake}
      className={className}
    />
  );
};
