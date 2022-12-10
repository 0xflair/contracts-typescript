import { SmartContract } from '../../common';

export type Diamond<TConfig = Record<string, any>> = {
  id?: string;
  ownerAddress?: `0x${string}`;
  chainId?: number;
  contractAddress?: `0x${string}`;
  smartContract?: SmartContract;
  deployTransaction?: string;
  config?: TConfig;
  plugins?: string[];
  archived?: boolean;
  updatedAt?: string;
  createdAt?: string;
};
