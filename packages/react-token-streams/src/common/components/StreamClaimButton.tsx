import { Button } from '@0xflair/react-ui';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';

type Props = {
  className?: string;
};

export const StreamClaimButton = ({
  className = 'mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed',
}: Props) => {
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
