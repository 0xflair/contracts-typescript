import React from 'react';
import { useDisconnect } from 'wagmi';

import { useLoginContext } from '../providers/login';

type Props = {
  label?: string;
  children?: React.ReactNode;
  className?: string;
};

export const LogoutButton = (props: Props) => {
  const { disconnect } = useDisconnect();
  const { logout } = useLoginContext();

  const logoutAndDisconnect = () => {
    disconnect();
    logout();
  };

  return (
    <button
      className={
        props.className ||
        'inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
      }
      onClick={logoutAndDisconnect}
    >
      {props.label || 'Logout'}
    </button>
  );
};
