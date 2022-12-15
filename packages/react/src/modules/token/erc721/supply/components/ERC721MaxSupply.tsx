import { Fragment } from 'react';

import { BareComponentProps } from '../../../../../common';
import { useERC721MaxSupply } from '../hooks';

type Props = BareComponentProps & {
  chainId?: number;
  contractAddress?: string;
  loadingMask?: React.ReactNode;
};

export const ERC721MaxSupply = ({
  chainId,
  contractAddress,
  as,
  loadingMask = (
    <span className="bg-gray-200 duration-300 animate-pulse h-3 w-8 rounded-lg"></span>
  ),
  ...attributes
}: Props) => {
  const { data: maxSupply, isLoading: maxSupplyLoading } = useERC721MaxSupply({
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
