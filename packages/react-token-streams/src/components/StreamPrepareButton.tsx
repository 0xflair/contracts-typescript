import { Button } from '@0xflair/react-ui';
import { BigNumberish, BytesLike } from 'ethers';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  className?: string;
  label?: string;
};

export const StreamPrepareButton = ({ className, label }: Props) => {
  const {
    data: { needsPrepare },
    isLoading: { prepareLoading },
    prepare,
  } = useStreamStakingContext();

  return (
    <Button
      text={label || `Approve NFTs`}
      onClick={() => prepare()}
      disabled={!needsPrepare || prepareLoading}
      className={className}
    />
  );
};
