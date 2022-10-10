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
  loadingMask,
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
