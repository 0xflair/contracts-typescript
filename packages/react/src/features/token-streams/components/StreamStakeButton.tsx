import { BigNumberish } from 'ethers';

import { BareComponentProps } from '../../../common';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  ticketTokenIds?: BigNumberish[];
} & BareComponentProps;

export const StreamStakeButton = ({
  as,
  ticketTokenIds,
  children,
  ...attributes
}: Props) => {
  const {
    data: { canStake, unlockedNfts },
    stake,
  } = useStreamStakingContext();

  const tokensToStake = (ticketTokenIds || unlockedNfts || [])?.length;

  const Component = as || 'button';

  return (
    <Component
      onClick={() => stake(ticketTokenIds ? { ticketTokenIds } : undefined)}
      disabled={!canStake}
      children={tokensToStake ? `Stake ${tokensToStake} NFTs` : `Stake`}
      {...attributes}
    />
  );
};
