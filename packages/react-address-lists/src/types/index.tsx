export type AddressList<
  TConfig extends Record<string, any> = Record<string, any>,
> = {
  _id: string;
  ownerAddress: string;
  name: string;
  title?: string;
  description?: string;
  totalAddressesCount?: number;
  config?: TConfig;
};

export type AddressListItem = {
  _id: string;
  address: string;
  maxAllocation?: number;
  createdAt: string;
  createdVia: string;
};
