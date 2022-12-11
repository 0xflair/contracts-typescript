import { classNames } from '@flair-sdk/common';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';

import {
  CryptoUnits,
  CryptoValue,
  IfWalletConnected,
} from '../../../../../core';
import {
  TieredSalesSelector,
  TieredSalesSelectorRenderProps,
} from '../../../../finance/tiered-sales/components/TieredSalesSelector';
import { NftMetadataPreview } from '../../../metadata/components/NftMetadataPreview';

type OptionClassProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
};

type Props = {
  className?: string;
  title?: string | React.ReactNode;
  titleClassName?: string;
  optionElement?: (props: TieredSalesSelectorRenderProps) => JSX.Element;
  optionClassName?: string | ((props: OptionClassProps) => string);
  labelElement?: (props: TieredSalesSelectorRenderProps) => JSX.Element;
  alwaysShow?: boolean;
};

export const ERC721TieredSalesSelector = (props: Props = {}) => {
  return (
    <TieredSalesSelector
      optionElement={({
        checked,
        active,
        disabled,
        tierId,
        tierConfig,
        currencySymbol,
        tokenMetadata,
      }: TieredSalesSelectorRenderProps) => {
        return (
          <>
            <span className="tier-item-wrapper flex flex-1">
              <span className="tier-item-content flex flex-col">
                <RadioGroup.Label
                  as="span"
                  className="tier-metadata block text-sm font-medium text-gray-900"
                >
                  {tokenMetadata ? (
                    <NftMetadataPreview
                      metadata={tokenMetadata}
                      hideAttributes={true}
                      hideDescription={true}
                    />
                  ) : (
                    <>Tier #{tierId}</>
                  )}
                </RadioGroup.Label>
                <IfWalletConnected>
                  {tierConfig.isEligible !== undefined ? (
                    <RadioGroup.Description
                      as="span"
                      className="tier-eligibility-status mt-1 flex items-center text-xs text-gray-500"
                    >
                      {tierConfig.isEligible ? 'Eligible' : 'Not eligible'}
                    </RadioGroup.Description>
                  ) : null}
                </IfWalletConnected>
                <RadioGroup.Description
                  as="span"
                  className="tier-price mt-4 text-sm font-medium text-gray-900"
                >
                  {tierConfig?.price?.toString() ? (
                    <CryptoValue
                      symbol={currencySymbol}
                      value={tierConfig.price?.toString()}
                      unit={CryptoUnits.WEI}
                      showPrice={false}
                      showSymbol={true}
                    />
                  ) : null}
                </RadioGroup.Description>
              </span>
            </span>
            <CheckCircleIcon
              className={classNames(
                !checked ? 'invisible' : '',
                'tier-checked-icon h-5 w-5 text-indigo-600',
              )}
              aria-hidden="true"
            />
            <span
              className={classNames(
                active ? 'border' : 'border-2',
                checked ? 'border-indigo-500' : 'border-transparent',
                'tier-checked-border pointer-events-none absolute -inset-px rounded-lg',
              )}
              aria-hidden="true"
            />
          </>
        );
      }}
      {...props}
    />
  );
};
