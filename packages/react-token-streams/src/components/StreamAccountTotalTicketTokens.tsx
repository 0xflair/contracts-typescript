import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamAccountTotalTicketTokens = ({
  as,
  ...attributes
}: Props) => {
  const {
    data: { ticketTokens },
  } = useStreamContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {ticketTokens === undefined || ticketTokens === null
        ? '...'
        : ticketTokens.length}
    </Component>
  );
};
