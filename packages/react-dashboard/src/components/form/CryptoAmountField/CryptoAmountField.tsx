import * as React from "react";
import { useNetwork } from "wagmi";
import { CryptoSymbol, CryptoPrice } from "@0xflair/react-crypto-prices";

export type CryptoAmountFieldProps = {
  label: string;
  description?: React.ReactNode;
  value: any;
  onChange: (event: any) => void;
};

export const CryptoAmountField = (props: CryptoAmountFieldProps) => {
  const { label, description, value, onChange } = props;

  const [{ data: networkData }] = useNetwork();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
          value={value}
          onChange={onChange}
        />
        <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            {networkData.chain?.nativeCurrency?.name} (
            <CryptoPrice
              value={value}
              symbol={networkData.chain?.nativeCurrency?.symbol as CryptoSymbol}
            />{" "}
            USD)
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
