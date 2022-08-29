import { BareComponentProps } from '@0xflair/react-common';
import humanizeDuration from 'humanize-duration';
import { Fragment } from 'react';

import { useStreamEmissionTimeUnit } from '../hooks/useStreamEmissionTimeUnit';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamEmissionTimeUnit = ({ as, ...attributes }: Props) => {
  const {
    data: { env, chainId, contractAddress },
  } = useStreamContext();

  const { data: emissionTimeUnit } = useStreamEmissionTimeUnit({
    env,
    chainId,
    contractAddress,
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      every{' '}
      {emissionTimeUnit
        ? humanizeDuration(Number(emissionTimeUnit.toString()) * 1000)
        : '...'}
    </Component>
  );
};
