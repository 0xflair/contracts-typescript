import { BareComponentProps } from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';

type Props = {
  ticketTokenIds?: BigNumberish[];
  claimToken?: BytesLike;
} & BareComponentProps;

export const StreamClaimButton = ({
  as,
  ticketTokenIds,
  claimToken,
  ...attributes
}: Props) => {
  const {
    data: { canClaim },
    claim,
  } = useStreamClaimingContext();

  const Component = as || 'button';

  return (
    <Component
      text="Claim"
      onClick={() => claim({ ticketTokenIds, claimToken })}
      disabled={!canClaim}
      {...attributes}
    />
  );
};
