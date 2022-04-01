import { AddressField, AddressFieldProps } from "./AddressField";
import { WalletProvider } from "@0xflair/react-wallet";
import { useState } from "react";

export default {
  title: "AddressField Component",
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

export const DefaultAddressField = (args: Partial<AddressFieldProps>) => {
  const [addressRawValue, setAddressRawValue] = useState("");
  const [addressNormalizedValue, setAddressNormalizedValue] =
    useState<string>();

  return (
    <div className="bg-gray-100 p-8">
      <AddressField
        label={args.label || "Address"}
        rawValue={addressRawValue}
        normalizedValue={addressNormalizedValue}
        onChange={(raw, normalized) => {
          setAddressRawValue(raw);
          setAddressNormalizedValue(normalized);
        }}
        {...args}
      />
    </div>
  );
};

DefaultAddressField.args = {
  label: "Your address or ENS name",
} as AddressFieldProps;
