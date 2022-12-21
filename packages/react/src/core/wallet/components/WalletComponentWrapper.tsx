import { classNames } from '@flair-sdk/common';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  as?: React.ElementType;
  className: string;
}>;

export const WalletComponentWrapper = ({ children, as, className }: Props) => {
  const Component = as || 'span';

  return (
    <>
      <Component className={classNames('flair-component', className)}>
        {children}
      </Component>
    </>
  );
};
