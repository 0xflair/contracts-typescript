import { classNames } from '@flair-sdk/common';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { BigNumber, BigNumberish } from 'ethers';
import { useEffect } from 'react';

import { useChainInfo } from '../../../../common';
import { CryptoUnits, CryptoValue, IfWalletConnected } from '../../../../core';
import { useTieredSalesContext } from '../providers';
import { Tier } from '../types';

type OptionClassProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
};

type RenderProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
  tierId: string;
  tier: Tier;
};

type Props = {
  className?: string;
  title?: string | React.ReactNode;
  titleClassName?: string;
  optionElement?: (props: RenderProps) => JSX.Element;
  optionClassName?: string | ((props: OptionClassProps) => string);
  labelElement?: (props: RenderProps) => JSX.Element;
  alwaysShow?: boolean;
};

export const TieredSalesSelector = ({
  className = 'flex flex-col gap-2',
  title = 'Select from active sale tiers',
  titleClassName = 'text-base font-medium text-gray-900',
  optionElement,
  optionClassName = ({ checked, active }) =>
    classNames(
      checked ? 'border-transparent' : 'border-gray-300',
      active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
      'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
    ),
  labelElement,
  alwaysShow = false,
}: Props) => {
  const {
    data: { chainId, autoDetectedTierId, currentTierId, tiers },
    isLoading: { isAutoDetectingTier },
    setCurrentTierId,
  } = useTieredSalesContext();

  const chainInfo = useChainInfo(chainId);

  const visibleTiers = Object.entries(tiers || {}).filter(([tierId, tier]) => {
    return (
      tier?.isActive ||
      tier?.isEligible ||
      (tier?.remainingSupply !== undefined &&
        BigNumber.from(tier?.remainingSupply).gt(0))
    );
  });

  useEffect(() => {
    if (
      isAutoDetectingTier ||
      (!visibleTiers.length && autoDetectedTierId === undefined) ||
      currentTierId !== undefined
    ) {
      return;
    }

    if (visibleTiers.length > 0) {
      setCurrentTierId(autoDetectedTierId || visibleTiers[0][0]);
    } else {
      setCurrentTierId(autoDetectedTierId || Object.keys(tiers || {})[0]);
    }
  }, [
    visibleTiers,
    autoDetectedTierId,
    currentTierId,
    isAutoDetectingTier,
    setCurrentTierId,
    tiers,
  ]);

  const renderLabel = labelElement
    ? labelElement
    : ({ tierId }: RenderProps) => <>Tier #{tierId}</>;

  const renderOption = optionElement
    ? optionElement
    : ({ checked, active, disabled, tier, tierId }: RenderProps) => (
        <>
          <span className="flex flex-1">
            <span className="flex flex-col">
              <RadioGroup.Label
                as="span"
                className="block text-sm font-medium text-gray-900"
              >
                {renderLabel({ checked, active, disabled, tier, tierId })}
              </RadioGroup.Label>
              <IfWalletConnected>
                {tier.isEligible !== undefined ? (
                  <RadioGroup.Description
                    as="span"
                    className="mt-1 flex items-center text-xs text-gray-500"
                  >
                    {tier.isEligible ? 'Eligible' : 'Not eligible'}
                  </RadioGroup.Description>
                ) : null}
              </IfWalletConnected>
              <RadioGroup.Description
                as="span"
                className="mt-4 text-sm font-medium text-gray-900"
              >
                {tier.price.toString() ? (
                  <CryptoValue
                    symbol={chainInfo?.nativeCurrency?.symbol}
                    value={tier.price.toString()}
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
              'h-5 w-5 text-indigo-600',
            )}
            aria-hidden="true"
          />
          <span
            className={classNames(
              active ? 'border' : 'border-2',
              checked ? 'border-indigo-500' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-lg',
            )}
            aria-hidden="true"
          />
        </>
      );

  return visibleTiers.length > 1 || alwaysShow ? (
    <RadioGroup
      className={className}
      value={currentTierId?.toString()}
      onChange={(newTierId: BigNumberish) => {
        setCurrentTierId(newTierId.toString());
      }}
    >
      {title ? (
        <RadioGroup.Label className={titleClassName}>{title}</RadioGroup.Label>
      ) : null}

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {visibleTiers.map(([tierId, tier]) => (
          <RadioGroup.Option
            key={tierId}
            value={tierId.toString()}
            className={optionClassName}
          >
            {({ checked, active, disabled }) =>
              renderOption({
                checked,
                active,
                disabled,
                tierId,
                tier,
              })
            }
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  ) : null;
};
