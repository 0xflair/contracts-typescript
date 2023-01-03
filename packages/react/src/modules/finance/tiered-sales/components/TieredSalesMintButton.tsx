import { Chain } from '@wagmi/chains';
import { BigNumber, ethers } from 'ethers';
import { Fragment, ReactNode } from 'react';

import { BareComponentProps, useChainInfo } from '../../../../common';
import { useContractSymbol } from '../../../token';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';
import { Tier } from '../types';

export type TieredSalesMintButtonVariables = {
  canMint?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  currentTierConfig?: Tier;
  isERC20Price?: boolean;
  finalSymbol?: string;
  chainInfo?: Chain;
};

type Props = Omit<BareComponentProps, 'children'> & {
  disabled?: boolean;
  showChainName?: boolean;
  loadingContent?: ReactNode;
  rampIgnoreCurrentBalance?: boolean;
  rampPreferredMethod?: string;
  children?:
    | ReactNode
    | ((variables: TieredSalesMintButtonVariables) => ReactNode);
};

export const TieredSalesMintButton = ({
  as = 'button',
  children,
  disabled,
  showChainName = true,
  loadingContent = (
    <span className="flex flex-col gap-1 items-center justify-center">
      <span className="rounded-full bg-gray-500/60 animate-pulse h-5 w-48" />
      <span className="rounded-full bg-gray-300/60 animate-pulse h-5 w-32" />
    </span>
  ),
  rampIgnoreCurrentBalance,
  rampPreferredMethod,
  ...attributes
}: Props) => {
  const {
    data: { chainId, canMint, currentTierConfig },
    isLoading: {
      rampRequestConfigLoading,
      tiersLoading,
      allowanceLoading,
      approveLoading,
      mintLoading,
    },
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

  const isLoading = Boolean(
    ((rampIgnoreCurrentBalance || rampPreferredMethod) &&
      rampRequestConfigLoading) ||
      tiersLoading ||
      allowanceLoading ||
      approveLoading ||
      mintLoading,
  );

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  const childrenFn =
    children ||
    (({
      canMint,
      disabled,
      isLoading,
      currentTierConfig,
      isERC20Price,
      finalSymbol,
      chainInfo,
    }) => (
      <span className="flex flex-col gap-1 items-center justify-center">
        <span>
          {currentTierConfig?.price &&
          BigNumber.from(currentTierConfig?.price).eq(0)
            ? `Mint for Free`
            : `Buy with ${isERC20Price !== undefined ? finalSymbol : '...'}`}
        </span>
        {showChainName && chainInfo?.name && (
          <span className="mint-chain-label opacity-50 text-xs font-light">
            on {`${chainInfo?.name}`}
          </span>
        )}
      </span>
    ));

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
      disabled={!canMint || !mint || disabled || isLoading}
      {...attributes}
    >
      {isLoading && loadingContent && !mintLoading
        ? loadingContent
        : typeof childrenFn === 'function'
        ? childrenFn({
            canMint,
            disabled,
            isLoading,
            currentTierConfig,
            isERC20Price,
            finalSymbol,
            chainInfo,
          })
        : childrenFn}
    </Component>
  );
};
