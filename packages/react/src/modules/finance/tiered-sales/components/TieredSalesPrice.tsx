import { BigNumber, ethers } from 'ethers';
import { Fragment, ReactNode } from 'react';

import { useContractSymbol } from '~/REACT_SDK/modules/token/metadata/hooks';

import { BareComponentProps, useChainInfo } from '../../../../common';
import { CryptoUnits, CryptoValue } from '../../../../core/crypto-currency';
import { useTieredSalesContext } from '../providers';

type Props = BareComponentProps & {
  loadingMask?: ReactNode;
  showPrice?: boolean;
  showSymbol?: boolean;
  freeElement?: ReactNode;
  mintCount?: number;
  fractionDigits?: number;
  tierId?: string;
};

export const TieredSalesPrice = ({
  as,
  loadingMask = '...',
  showPrice = false,
  showSymbol = true,
  freeElement = <>Free</>,
  tierId,
  mintCount = 1,
  fractionDigits,
  ...attributes
}: Props) => {
  const {
    data: { chainId, tiers, currentTierId },
    isLoading: { isAutoDetectingTier },
  } = useTieredSalesContext();

  const chainInfo = useChainInfo(chainId);
  const finalTierId = tierId || currentTierId;
  const finalTier =
    finalTierId && tiers && Number(finalTierId.toString()) in tiers
      ? tiers[Number(finalTierId.toString())]
      : undefined;

  const pricePerUnit = finalTier?.price;

  const mintNo = Number(mintCount || '1');
  const finalPrice =
    pricePerUnit !== undefined && mintCount !== undefined
      ? BigNumber.from(pricePerUnit).mul(Number.isNaN(mintNo) ? 1 : mintNo)
      : undefined;

  const isERC20Price =
    finalTier?.currency && finalTier?.currency !== ethers.constants.AddressZero;

  const { data: erc20Symbol } = useContractSymbol({
    chainId: chainInfo?.id,
    contractAddress: finalTier?.currency?.toString(),
    enabled: Boolean(chainInfo?.id && isERC20Price),
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {finalPrice !== undefined && !isAutoDetectingTier ? (
        Number(finalPrice.toString()) > 0 || !freeElement ? (
          <CryptoValue
            symbol={
              isERC20Price
                ? erc20Symbol?.toString()
                : chainInfo?.nativeCurrency?.symbol?.toString()
            }
            value={finalPrice}
            unit={CryptoUnits.WEI}
            showPrice={showPrice}
            showSymbol={showSymbol}
            fractionDigits={fractionDigits}
          />
        ) : (
          freeElement
        )
      ) : (
        loadingMask
      )}
    </Component>
  );
};
