import { ContractFqn, ContractVersion } from '@0xflair/contracts-registry';

export type TokenStream<
  TConfig extends Record<string, any> = Record<string, any>
> = {
  _id: string;

  chainId: number;
  ownerAddress: string;
  name: string;
  publicTitle?: string;
  publicDescription?: string;
  presetFqn?: ContractFqn;
  presetVersion?: ContractVersion;
  contractAddress?: string;
  deployTransaction?: string;

  config?: TConfig;
};
