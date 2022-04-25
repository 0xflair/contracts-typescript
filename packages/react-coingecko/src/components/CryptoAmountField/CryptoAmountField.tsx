import { BigNumberish, utils } from 'ethers';
import * as React from 'react';
import { useNetwork } from 'wagmi';

import { CryptoSymbol, CryptoUnits } from '../../types';
import { CryptoPrice } from '../CryptoPrice/CryptoPrice';

export type CryptoAmountFieldProps = {
  label: string;
  description?: React.ReactNode;
  value: string | BigNumberish;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
  onChange: (value: string) => void;
};

export const CryptoAmountField = (props: CryptoAmountFieldProps) => {
  const {
    label,
    description,
    value,
    unit = CryptoUnits.ETHER,
    symbol,
    onChange,
  } = props;

  const convertedValueWei = utils.parseUnits(value.toString(), unit);
  const convertedValueEther = utils.formatEther(convertedValueWei);
  const [{ data: networkData }] = useNetwork();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md">
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
          value={convertedValueEther}
          onChange={(event) =>
            onChange(
              utils.formatUnits(utils.parseEther(event.target.value), unit)
            )
          }
        />
        <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            {networkData.chain?.nativeCurrency?.name} (
            <CryptoPrice
              value={value}
              symbol={
                symbol ||
                (networkData.chain?.nativeCurrency?.symbol as CryptoSymbol)
              }
              unit={unit}
            />{' '}
            USD)
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};
