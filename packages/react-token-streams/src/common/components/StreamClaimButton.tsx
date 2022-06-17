import { Button } from '@0xflair/react-ui';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';

type Props = {
  className?: string;
};

export const StreamClaimButton = ({ className }: Props) => {
  const {
    data: { canClaim },
    claim,
  } = useStreamClaimingContext();

  return (
    <Button
      text="Claim"
      onClick={() => claim()}
      disabled={!canClaim}
      className={className}
    />
  );
};
