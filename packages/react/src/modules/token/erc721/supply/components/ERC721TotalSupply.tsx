import { Fragment } from 'react';

import { BareComponentProps } from '../../../../../common';
import { useERC721TotalSupply } from '../hooks';

type Props = BareComponentProps & {
  chainId?: number;
  contractAddress?: string;
  loadingMask?: React.ReactNode;
};

export const ERC721TotalSupply = ({
  chainId,
  contractAddress,
  as,
  loadingMask = '...',
  ...attributes
}: Props) => {
  const { data: totalSupply, isLoading: totalSupplyLoading } =
    useERC721TotalSupply({
      chainId,
      contractAddress,
    });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && totalSupplyLoading && totalSupply === undefined
        ? loadingMask
        : totalSupply?.toString()}
    </Component>
  );
};
