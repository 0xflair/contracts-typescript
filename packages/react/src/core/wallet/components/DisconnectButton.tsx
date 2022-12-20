import React from 'react';
import { useDisconnect } from 'wagmi';

import { BareComponentProps } from '../../../common';

type Props = BareComponentProps & {
  label?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export const DisconnectButton = ({
  as,
  label = 'Disconnect',
  ...attributes
}: Props) => {
  const { disconnect } = useDisconnect();

  const Component = as || 'button';

  return (
    <Component onClick={() => disconnect()} {...attributes}>
      {label}
    </Component>
  );
};
