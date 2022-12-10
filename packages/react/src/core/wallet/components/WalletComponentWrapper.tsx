import { PropsWithChildren } from 'react';

import { classNames } from '@flair-sdk/common';

type Props = {
  as?: React.ElementType;
  className: string;
} & PropsWithChildren<any>;

export const WalletComponentWrapper = ({ children, as, className }: Props) => {
  const Component = as || 'span';

  return (
    <Component className={classNames('flair-component', className)}>
      {children}
    </Component>
  );
};
