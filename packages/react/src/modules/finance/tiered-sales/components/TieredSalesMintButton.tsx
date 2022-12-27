import { BigNumber, ethers } from 'ethers';
import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps, useChainInfo } from '../../../../common';
import { useContractSymbol } from '../../../token';
import { useTieredSalesContext } from '../providers';

type Props = PropsWithChildren<BareComponentProps> & {
  disabled?: boolean;
  rampIgnoreCurrentBalance?: boolean;
  rampPreferredMethod?: string;
};

export const TieredSalesMintButton = ({
  as = 'button',
  children,
  disabled,
  rampIgnoreCurrentBalance,
  rampPreferredMethod,
  ...attributes
}: Props) => {
  const {
    data: { chainId, canMint, currentTierConfig },
    isLoading: { rampRequestConfigLoading },
    mint,
  } = useTieredSalesContext();

  const chainInfo = useChainInfo(chainId);
  const isERC20Price = currentTierConfig?.currency
    ? currentTierConfig?.currency !== ethers.constants.AddressZero
    : undefined;

  const { data: erc20Symbol } = useContractSymbol({
    chainId: chainInfo?.id,
    contractAddress: currentTierConfig?.currency?.toString(),
    enabled: Boolean(chainInfo?.id && isERC20Price),
  });

  const finalSymbol = isERC20Price
    ? erc20Symbol?.toString()
    : chainInfo?.nativeCurrency?.symbol?.toString();

  const preparingRamp =
    (rampIgnoreCurrentBalance || rampPreferredMethod) &&
    rampRequestConfigLoading;

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component
      onClick={() =>
        mint?.(
          undefined,
          rampIgnoreCurrentBalance || rampPreferredMethod
            ? {
                customData: {
                  rampIgnoreCurrentBalance,
                  rampPreferredMethod,
                  rampChainId: chainInfo?.id,
                },
              }
            : undefined,
        )
      }
      disabled={!canMint || !mint || disabled || preparingRamp}
      {...attributes}
    >
      {children || (
        <span className="flex flex-col gap-1 items-center justify-center">
          <span>
            {currentTierConfig?.price &&
            BigNumber.from(currentTierConfig?.price).eq(0)
              ? `Mint for Free`
              : `Buy with ${isERC20Price !== undefined ? finalSymbol : '...'}`}
          </span>
          {chainInfo?.name && (
            <span className="mint-chain-label opacity-50 text-xs font-light">
              on {`${chainInfo?.name}`}
            </span>
          )}
        </span>
      )}
    </Component>
  );
};
