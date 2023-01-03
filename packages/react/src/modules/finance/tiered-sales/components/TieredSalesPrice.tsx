import { BigNumber, ethers } from 'ethers';
import { Fragment, ReactNode, useMemo } from 'react';

import { BareComponentProps, useChainInfo } from '../../../../common';
import { CryptoValue } from '../../../../core/crypto-currency';
import { useContractDecimals, useContractSymbol } from '../../../token';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

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
  loadingMask = (
    <div className="rounded-full bg-gray-400 animate-pulse h-8 w-20" />
  ),
  showPrice = false,
  showSymbol = true,
  freeElement = <>Free</>,
  tierId,
  mintCount,
  fractionDigits,
  ...attributes
}: Props) => {
  const {
    data: {
      chainId,
      tiers,
      currentTierId,
      contractDecimals,
      mintCount: currentMintCount,
    },
    isLoading: { isAutoDetectingTier },
  } = useTieredSalesContext();

  const chainInfo = useChainInfo(chainId);
  const finalTierId = tierId || currentTierId;
  const finalTier =
    finalTierId !== undefined && tiers && tiers[Number(finalTierId.toString())]
      ? tiers[Number(finalTierId.toString())]
      : undefined;
  const finalMintCount = Number(
    mintCount !== undefined ? mintCount : currentMintCount || '1',
  );
  const mintCountBN = useMemo(
    () =>
      contractDecimals
        ? ethers.utils.parseUnits(finalMintCount.toString(), contractDecimals)
        : BigNumber.from(Math.ceil(Number(finalMintCount || 0)).toString()),
    [finalMintCount, contractDecimals],
  );
  const finalPrice = useMemo(() => {
    return typeof finalTier?.price !== 'undefined'
      ? BigNumber.from(finalTier?.price)
          .mul(BigNumber.from(mintCountBN))
          .div(
            contractDecimals
              ? BigNumber.from(10).pow(contractDecimals)
              : BigNumber.from(1),
          )
      : undefined;
  }, [finalTier?.price, mintCountBN, contractDecimals]);

  const isERC20Price =
    finalTier?.currency && finalTier?.currency !== ethers.constants.AddressZero;

  const { data: currencyERC20Decimals } = useContractDecimals({
    chainId,
    contractAddress: finalTier?.currency as string,
    enabled: Boolean(
      chainId &&
        finalTier?.currency &&
        finalTier?.currency !== ethers.constants.AddressZero,
    ),
  });
  const { data: currencyERC20Symbol } = useContractSymbol({
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
                ? currencyERC20Symbol?.toString()
                : chainInfo?.nativeCurrency?.symbol?.toString()
            }
            value={finalPrice}
            formatted={false}
            decimals={
              isERC20Price
                ? currencyERC20Decimals
                : chainInfo?.nativeCurrency?.decimals || 18
            }
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
