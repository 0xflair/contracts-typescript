import { Fragment } from 'react';

import { BareComponentProps } from '../../../../../common';
import { useERC721MaxSupply, useERC721TotalSupply } from '../hooks';

type Props = BareComponentProps & {
  chainId?: number;
  contractAddress?: string;
  loadingMask?: React.ReactNode;
  separator?: React.ReactNode;
};

export const ERC721SupplyCounter = ({
  chainId,
  contractAddress,
  as,
  loadingMask = (
    <div className="flex gap-1 items-center">
      <span className="bg-gray-200 duration-300 animate-pulse h-3 w-8 rounded-lg"></span>
      <span>/</span>
      <span className="bg-gray-200 duration-300 animate-pulse h-3 w-8 rounded-lg"></span>
    </div>
  ),
  separator = <>&nbsp;/&nbsp;</>,
  ...attributes
}: Props) => {
  const { data: totalSupply, isLoading: totalSupplyLoading } =
    useERC721TotalSupply({
      chainId,
      contractAddress,
    });
  const { data: maxSupply, isLoading: maxSupplyLoading } = useERC721MaxSupply({
    chainId,
    contractAddress,
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask &&
      (maxSupplyLoading || totalSupplyLoading) &&
      (totalSupply === undefined || maxSupply === undefined) ? (
        loadingMask
      ) : (
        <>
          {totalSupply?.toString()}
          {separator}
          {maxSupply?.toString()}
        </>
      )}
    </Component>
  );
};
