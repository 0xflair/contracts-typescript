import { CryptoSymbol } from '@flair-sdk/common';
import { BigNumber, BigNumberish, ethers, utils } from 'ethers';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNetwork } from 'wagmi';

import {
  useContractDecimals,
  useContractSymbol,
} from '../../../../modules/token/metadata/hooks';
import { CryptoPrice } from '../../../crypto-currency/components';

export type CryptoAmountInputProps = {
  value: string | BigNumberish;
  decimals?: BigNumberish;
  formatted?: boolean;
  token?: string;
  showPrice?: boolean;
  min?: number;
  max?: number;
  tabIndex?: number;
  onChange?: (value: BigNumberish) => void;
};

export const CryptoAmountInput = (props: CryptoAmountInputProps) => {
  const {
    value,
    decimals = 18,
    formatted,
    token,
    showPrice = true,
    min,
    max,
    tabIndex,
    onChange,
  } = props;

  const { chain } = useNetwork();

  const inputValueBN = useMemo(
    () =>
      formatted
        ? utils.parseUnits(value.toString(), decimals)
        : BigNumber.from(value).toString(),
    [decimals, formatted, value],
  );
  const inputValueFormatted = utils.formatUnits(inputValueBN, decimals);

  const [formattedValue, setFormattedValue] = useState(
    inputValueFormatted.toString().replace(/,/g, '.'),
  );

  const { data: erc20Symbol } = useContractSymbol({
    chainId: chain?.id,
    contractAddress: token,
    enabled: Boolean(
      chain?.id && token && token !== ethers.constants.AddressZero,
    ),
  });
  const { data: erc20Decimals } = useContractDecimals({
    chainId: chain?.id,
    contractAddress: token,
    enabled: Boolean(
      chain?.id && token && token !== ethers.constants.AddressZero,
    ),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () =>
      setFormattedValue(
        parseFloat(inputValueFormatted.toString())
          .toString()
          .replace(/,/g, '.'),
      ),
    [inputValueFormatted],
  );

  const handleChange = useCallback(
    (formattedValue: string) => {
      try {
        onChange &&
          onChange(
            decimals
              ? utils.parseUnits(formattedValue || '0', decimals)
              : Math.ceil(Number(formattedValue) || 0),
          );
      } catch (e) {
        debugger;
      }
    },
    [decimals, onChange],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeDebounced = useCallback(debounce(handleChange, 100), [
    handleChange,
  ]);

  return (
    <div className="crypto-amount-field w-full relative">
      <input
        type="number"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        placeholder={decimals ? '0.00' : '0'}
        pattern={
          decimals ? '^[0-9]+(.[0-9]{1,' + decimals + '})?$' : '^[0-9]+$'
        }
        value={formattedValue.toString().replace(/,/g, '.')}
        min={min || 0}
        max={max || Infinity}
        tabIndex={tabIndex}
        step={decimals ? `Any` : '1'}
        onChange={(e) => {
          setFormattedValue(e.target.value.replace(/,/g, '.'));

          if (Number.isNaN(Number(e.target.value)) || !Number(e.target.value)) {
            return;
          }

          handleChangeDebounced(e.target.value);
        }}
        onBlur={() => {
          if (value.toString() !== formattedValue.toString()) {
            handleChangeDebounced(formattedValue || '0');
          }
        }}
      />
      {showPrice ? (
        <div className="crypto-amount-field-price-tag absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            (
            {!token || token?.toString() === ethers.constants.AddressZero
              ? chain?.nativeCurrency?.name
              : erc20Symbol?.toString()}
            ){' '}
            <CryptoPrice
              value={formattedValue}
              formatted={true}
              decimals={erc20Decimals}
              symbol={
                (!token || token?.toString() === ethers.constants.AddressZero
                  ? chain?.nativeCurrency?.symbol
                  : erc20Symbol?.toString()) as CryptoSymbol
              }
              showCurrencySymbol={true}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};
