import React, { ReactNode } from 'react';

export const PRIMARY_BUTTON =
  'inline-flex items-center whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

export const SECONDARY_BUTTON =
  'inline-flex items-center whitespace-nowrap px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

export const DANGER_BUTTON =
  'inline-flex items-center whitespace-nowrap px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed';

export const ACTION_BUTTON =
  'inline-flex items-center whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed';

interface Props {
  text: ReactNode;
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
      className={props.className || PRIMARY_BUTTON}
    >
      <span>{props.text}</span>
      {props.icon && (
        <span className="flex items-center justify-center h-6 w-6">
          {props.icon}
        </span>
      )}
    </button>
  );
};
