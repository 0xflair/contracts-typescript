import { BytesLike } from 'ethers';
import { Fragment } from 'react';

import { useCollectionContext } from '../../../common/providers/CollectionProvider';
import { useTierSaleWalletMints } from '../hooks/useTierSaleWalletMints';
import { useCollectionSalesMintingContext } from '../providers/CollectionSalesMintingProvider';
import { BareComponentProps } from '../types';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: number;
  walletAddress?: BytesLike;
};

export const CollectionTierWalletMints = ({
  as = Fragment,
  loadingMask = '...',
  tierId,
  walletAddress,
  ...attributes
}: Props) => {
  const {
    data: { chainId, contractAddress, contractVersion },
  } = useCollectionContext();

  const {
    data: { currentTierId, minterAddress },
  } = useCollectionSalesMintingContext();

  const finalTierId = tierId !== undefined ? tierId : currentTierId || '0';
  const finalWalletAddress = walletAddress || minterAddress;

  const canCheck = Boolean(finalTierId !== undefined && finalWalletAddress);
  const { data, isLoading } = useTierSaleWalletMints({
    chainId,
    contractAddress,
    contractVersion,
    tierId: finalTierId,
    walletAddress: finalWalletAddress,
    watch: canCheck,
    enabled: canCheck,
  });

  const Component = as;

  return (
    <Component {...attributes}>
      {loadingMask && isLoading && data === undefined ? (
        <>{loadingMask}</>
      ) : (
        data?.toLocaleString()
      )}
    </Component>
  );
};
