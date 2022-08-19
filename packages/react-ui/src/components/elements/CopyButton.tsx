import { classNames } from '@0xflair/react-common';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

import { Button, SECONDARY_BUTTON } from './Button';

type Props = {
  label?: string;
  content?: any;
  className?: string;
};

export const CopyButton = ({ label, content, className }: Props) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [recentlyCopied, setRecentlyCopied] = useState(false);

  return (
    <Button
      text={label || 'Copy to clipboard'}
      icon={
        recentlyCopied ? (
          <CheckCircleIcon
            className="h-4 w-4 text-green-500"
            aria-hidden="true"
          />
        ) : null
      }
      className={className || classNames(SECONDARY_BUTTON, 'text-sm')}
      onClick={() =>
        copyToClipboard(content).then(() => setRecentlyCopied(true))
      }
    />
  );
};
