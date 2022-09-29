import { BytesLike } from 'ethers';
import { Fragment } from 'react';

import { BareComponentProps } from '../../../common';
import { useTieredSalesWalletMints as useTieredSalesWalletMints } from '../hooks/useTieredSalesWalletMints';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
  walletAddress?: BytesLike;
};

export const TieredSalesWalletMints = ({
  as,
  loadingMask = '...',
  tierId,
  walletAddress,
  ...attributes
}: Props) => {
  const {
    data: { chainId, contractAddress, currentTierId, minterAddress },
  } = useTieredSalesContext();

  const finalTierId = tierId !== undefined ? tierId : currentTierId || '0';
  const finalWalletAddress = walletAddress || minterAddress;

  const canCheck = Boolean(finalTierId !== undefined && finalWalletAddress);
  const { data, isLoading } = useTieredSalesWalletMints({
    chainId,
    contractAddress,
    tierId: finalTierId,
    walletAddress: finalWalletAddress,
    watch: canCheck,
    enabled: canCheck,
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {loadingMask && (isLoading || data === undefined) ? (
        <>{loadingMask}</>
      ) : (
        data?.toLocaleString()
      )}
    </Component>
  );
};
