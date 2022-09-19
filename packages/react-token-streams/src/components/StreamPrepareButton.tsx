import { Button } from '@flair-sdk/react-ui';

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
