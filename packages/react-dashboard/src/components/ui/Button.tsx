import React, { ReactNode } from 'react';

export const PRIMARY =
  'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

export const SECONDARY =
  'inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

export const ACTION =
  'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed';

export interface Props {
  text: string;
  icon?: ReactNode;
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

export const Button = (props: Props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type="button"
      className={props.className || PRIMARY}
    >
      {props.text}
      {props.icon && <span className="ml-2 h-6 w-6">{props.icon}</span>}
    </button>
  );
};
