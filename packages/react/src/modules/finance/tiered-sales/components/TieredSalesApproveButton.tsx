import { BigNumberish, ethers } from 'ethers';
import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers';

type Props = PropsWithChildren<BareComponentProps> & {
  label?: string;
  tierId?: BigNumberish;
};

export const TieredSalesApproveButton = ({
  as = 'button',
  label = 'Approve to mint',
  children,
  tierId,
  ...attributes
}: Props) => {
  const {
    data: { isERC20Payment, isApproveNeeded },
    isLoading: { allowanceLoading, approveLoading },
    approve,
  } = useTieredSalesContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  if (!isERC20Payment || !isApproveNeeded) {
    return <>{children}</>;
  }

  return (
    <Component
      onClick={() => approve?.()}
      disabled={
        allowanceLoading || approveLoading || !isApproveNeeded || !approve
      }
      {...attributes}
    >
      {label}
    </Component>
  );
};
