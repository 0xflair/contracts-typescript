import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  hideSymbol?: boolean;
} & BareComponentProps;

export const StreamLockedNfts = ({ as, hideSymbol, ...attributes }: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { lockedNfts },
  } = useStreamStakingContext();
  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);
  return (
    <Component {...attributes}>
      {lockedNfts === undefined || lockedNfts === null
        ? '...'
        : lockedNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </Component>
  );
};
