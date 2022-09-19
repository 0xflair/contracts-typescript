import { Fragment } from 'react';

import { BareComponentProps } from '../../common';
import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  hideSymbol?: boolean;
} & BareComponentProps;

export const StreamUnlockedNfts = ({
  as,
  hideSymbol,
  ...attributes
}: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { unlockedNfts },
  } = useStreamStakingContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {unlockedNfts === undefined || unlockedNfts === null
        ? '...'
        : unlockedNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </Component>
  );
};
