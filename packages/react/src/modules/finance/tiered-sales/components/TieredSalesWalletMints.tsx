import { BigNumberish, BytesLike } from 'ethers';
import { Fragment } from 'react';

import { BareComponentProps } from '../../../../common';
import { CryptoValue } from '../../../../core/crypto-currency/components';
import { useTieredSalesWalletMints } from '../hooks/useTieredSalesWalletMints';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = BareComponentProps & {
  loadingMask?: React.ReactNode;
  tierId?: BigNumberish;
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
    data: {
      chainId,
      contractAddress,
      currentTierId,
      minterAddress,
      contractDecimals,
    },
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
      ) : !contractDecimals ? (
        data?.toLocaleString()
      ) : (
        <CryptoValue
          decimals={contractDecimals}
          formatted={false}
          value={data}
          showPrice={false}
          showSymbol={false}
        />
      )}
    </Component>
  );
};
