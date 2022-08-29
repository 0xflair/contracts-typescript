import { BareComponentProps } from '@0xflair/react-common';
import humanizeDuration from 'humanize-duration';
import { Fragment } from 'react';

import { useStreamTotalStakedDurations } from '../hooks/useStreamTotalStakedDurations';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamTotalStakedDurations = ({ as, ...attributes }: Props) => {
  const {
    data: { env, chainId, contractAddress, selectedTicketTokenIds },
  } = useStreamContext();

  const { data: totalDurations } = useStreamTotalStakedDurations({
    env,
    chainId,
    contractAddress,
    args: { ticketTokenIds: selectedTicketTokenIds },
    enabled: Boolean(
      selectedTicketTokenIds && selectedTicketTokenIds.length > 0,
    ),
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      ~
      {totalDurations
        ? humanizeDuration(Number(totalDurations.toString()) * 1000, {
            largest: 2,
          })
        : '...'}
    </Component>
  );
};
