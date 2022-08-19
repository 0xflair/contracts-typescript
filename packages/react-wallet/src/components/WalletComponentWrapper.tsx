import { classNames } from '@0xflair/react-common';
import { PropsWithChildren } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className: string;
} & PropsWithChildren;

export const WalletComponentWrapper = ({ children, as, className }: Props) => {
  const Component = as || 'span';

  return (
    <Component className={classNames('flair-wallet-component', className)}>
      {children}
    </Component>
  );
};
