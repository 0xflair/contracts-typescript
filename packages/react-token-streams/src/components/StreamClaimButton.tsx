import { BareComponentProps } from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';

import { useStreamContext } from '../providers';
import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';

type Props = {
  ticketTokenIds?: BigNumberish[];
  claimToken?: BytesLike;
} & BareComponentProps;

export const StreamClaimButton = ({
  as,
  ticketTokenIds,
  claimToken,
  children,
  ...attributes
}: Props) => {
  const {
    data: { walletAddress },
  } = useStreamContext();
  const {
    data: { canClaim },
    claim,
  } = useStreamClaimingContext();

  const Component = as || 'button';

  return (
    <Component
      onClick={() =>
        claim({ ticketTokenIds, claimToken, owner: walletAddress })
      }
      disabled={!canClaim}
      children={`Claim`}
      {...attributes}
    />
  );
};
