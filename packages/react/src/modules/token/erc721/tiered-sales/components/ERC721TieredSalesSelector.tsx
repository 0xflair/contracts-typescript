import { classNames } from '@flair-sdk/common';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid/esm/index.js';

import { CryptoValue, IfWalletConnected } from '../../../../../core';
import {
  TieredSalesSelector,
  TieredSalesSelectorProps,
  TieredSalesSelectorRenderProps,
} from '../../../../finance/tiered-sales/components/TieredSalesSelector';
import { NftMetadataPreview } from '../../../metadata/components/NftMetadataPreview';

export const ERC721TieredSalesSelector = (props: TieredSalesSelectorProps) => {
  return (
    <TieredSalesSelector
      optionElement={({
        chainInfo,
        checked,
        active,
        disabled,
        tierId,
        tierConfig,
        isERC20Price,
        currencySymbol,
        currencyDecimals,
        tierMetadata,
      }: TieredSalesSelectorRenderProps) => {
        return (
          <>
            <span className="tier-item-wrapper flex flex-1">
              <span className="tier-item-content flex flex-col">
                <RadioGroup.Label
                  as="span"
                  className="tier-metadata block text-sm font-medium text-gray-900"
                >
                  {tierMetadata ? (
                    <NftMetadataPreview
                      metadata={tierMetadata}
                      hideAttributes={true}
                      hideDescription={true}
                      preferDedicatedGateway={true}
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
                  {tierConfig?.price?.toString() === '0' ? (
                    'Free'
                  ) : (
                    <CryptoValue
                      symbol={currencySymbol}
                      value={tierConfig.price?.toString()}
                      formatted={false}
                      decimals={
                        currencyDecimals ||
                        chainInfo?.nativeCurrency.decimals ||
                        18
                      }
                      showPrice={false}
                      showSymbol={true}
                    />
                  )}
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
