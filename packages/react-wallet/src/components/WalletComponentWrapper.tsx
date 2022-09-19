import { classNames } from '@flair-sdk/common';
import { PropsWithChildren } from 'react';

type Props = {
  as?: React.ElementType;
  className: string;
} & PropsWithChildren<any>;

export const WalletComponentWrapper = ({ children, as, className }: Props) => {
  const Component = as || 'span';

  return (
    <Component className={classNames('flair-wallet-component', className)}>
      {children}
    </Component>
  );
};
