import React from 'react';

type Props = {
  hoverContent?: JSX.Element | string;
  className?: string;
  children: JSX.Element | JSX.Element[] | string | (JSX.Element | string)[];
};

export const Tooltip = (props: Props) => {
  // initialization
  const { children, hoverContent, className } = props;

  return (
    <span className={className || 'group relative inline-block'}>
      {children}
      {hoverContent ? (
        <span className="opacity-0 left-0 whitespace-nowrap bg-black text-white text-left text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full px-3 pointer-events-none">
          {hoverContent}
          <svg
            className="absolute text-black h-2 w-5 left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </span>
      ) : (
        ''
      )}
    </span>
  );
};
