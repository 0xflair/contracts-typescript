import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamAccountSelectedTicketTokens = ({
  as,
  ...attributes
}: Props) => {
  const {
    data: { selectedTicketTokens },
  } = useStreamContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {selectedTicketTokens === undefined || selectedTicketTokens === null
        ? '...'
        : selectedTicketTokens.length}
    </Component>
  );
};
