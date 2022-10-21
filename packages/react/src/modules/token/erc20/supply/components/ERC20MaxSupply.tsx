import { Fragment } from 'react';

import { BareComponentProps } from '../../../../../common';
import { useERC20MaxSupply } from '../hooks';

type Props = BareComponentProps & {
  chainId?: number;
  contractAddress?: string;
  loadingMask?: React.ReactNode;
};

export const ERC20MaxSupply = ({
  chainId,
  contractAddress,
  as,
  loadingMask = '...',
  ...attributes
}: Props) => {
  const { data: maxSupply, isLoading: maxSupplyLoading } = useERC20MaxSupply({
    chainId,
    contractAddress,
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && maxSupplyLoading && maxSupply === undefined
        ? loadingMask
        : maxSupply?.toString()}
    </Component>
  );
};
