import { Button } from '@0xflair/react-ui';
import { BigNumberish, BytesLike } from 'ethers';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';

type Props = {
  className?: string;
  ticketTokenIds?: BigNumberish[];
  claimToken?: BytesLike;
};

export const StreamClaimButton = ({
  className,
  ticketTokenIds,
  claimToken,
}: Props) => {
  const {
    data: { canClaim },
    claim,
  } = useStreamClaimingContext();

  return (
    <Button
      text="Claim"
      onClick={() => claim({ ticketTokenIds, claimToken })}
      disabled={!canClaim}
      className={className}
    />
  );
};
