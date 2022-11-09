import React from 'react';
import { useDisconnect } from 'wagmi';

import { SECONDARY_BUTTON } from '../../ui';

type Props = {
  label?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export const DisconnectButton = (props: Props) => {
  const { disconnect } = useDisconnect();

  return (
    <button
      className={props.className || SECONDARY_BUTTON}
      onClick={() => disconnect()}
      disabled={props.disabled}
    >
      {props.label || 'Disconnect'}
    </button>
  );
};
