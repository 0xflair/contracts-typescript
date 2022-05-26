import { SECONDARY_BUTTON } from '@0xflair/react-ui';
import React from 'react';
import { useDisconnect } from 'wagmi';

type Props = {
  label?: React.ReactNode;
  className?: string;
};

export const DisconnectButton = (props: Props) => {
  const { disconnect } = useDisconnect();

  return (
    <button
      className={props.className || SECONDARY_BUTTON}
      onClick={() => disconnect()}
    >
      {props.label || 'Disconnect'}
    </button>
  );
};
