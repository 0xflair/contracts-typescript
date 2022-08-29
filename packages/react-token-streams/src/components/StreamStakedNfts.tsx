import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamContext } from '../providers/StreamProvider';
import { useStreamStakingContext } from '../providers/StreamStakingProvider';

type Props = {
  hideSymbol?: boolean;
} & BareComponentProps;

export const StreamStakedNfts = ({ hideSymbol, as, ...attributes }: Props) => {
  const {
    data: { ticketTokenSymbol },
  } = useStreamContext();
  const {
    data: { stakedNfts },
  } = useStreamStakingContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {stakedNfts === undefined || stakedNfts === null
        ? '...'
        : stakedNfts.length}{' '}
      {hideSymbol ? null : ticketTokenSymbol?.toString() || '...'}
    </Component>
  );
};
