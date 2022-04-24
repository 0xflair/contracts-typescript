import React from 'react';

type Props = {
  color: string;
  text: string;
  href?: string;
};

export const Badge = (props: Props) => {
  // initialization
  const { text, color, href } = props;

  // views
  return (
    <span
      className={`inline-flex items-center rounded-full text-xs font-medium h-6 px-2.5 py-0.5 bg-${color}-100 bg-opacity-75 text-${color}-800`}
    >
      <svg
        className={`-ml-0.5 mr-1.5 h-2 w-2 text-${color}-800`}
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {href ? (
        <a href={href} target={'_blank'} rel="noreferrer">
          {text}
        </a>
      ) : (
        text
      )}
    </span>
  );
};
