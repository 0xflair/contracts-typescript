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
  children,
  ...attributes
}: Props) => {
  const {
    data: { canClaim },
    claim,
  } = useStreamClaimingContext();

  const Component = as || 'button';

  return (
    <Component
      onClick={() => claim({ ticketTokenIds, claimToken })}
      disabled={!canClaim}
      children={`Claim`}
      {...attributes}
    />
  );
};
