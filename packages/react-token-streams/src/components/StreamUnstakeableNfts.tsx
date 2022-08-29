import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  hideSymbol?: boolean;
} & BareComponentProps;

export const StreamUnstakeableNfts = ({
  as,
  hideSymbol,
  ...attributes
}: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { unstakeableNfts },
  } = useStreamStakingContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {unstakeableNfts === undefined || unstakeableNfts === null
        ? '...'
        : unstakeableNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </Component>
  );
};
