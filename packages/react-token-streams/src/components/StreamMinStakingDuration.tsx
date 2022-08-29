import { BareComponentProps } from '@0xflair/react-common';
import humanizeDuration from 'humanize-duration';
import { Fragment } from 'react';

import { useStreamMinStakingDuration } from '../hooks/useStreamMinStakingDuration';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamMinStakingDuration = ({ as, ...attributes }: Props) => {
  const {
    data: { env, chainId, contractAddress },
  } = useStreamContext();

  const { data: minStakingDuration } = useStreamMinStakingDuration({
    chainId,
    contractAddress,
  });
  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);
  return (
    <Component {...attributes}>
      {minStakingDuration
        ? humanizeDuration(Number(minStakingDuration.toString()) * 1000)
        : '...'}
    </Component>
  );
};
