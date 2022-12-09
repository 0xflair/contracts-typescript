import { SmartContract } from '../../common';

export type Diamond<TConfig = Record<string, any>> = {
  id?: string;
  ownerAddress?: string;
  chainId?: number;
  contractAddress?: string;
  smartContract?: SmartContract;
  deployTransaction?: string;
  config?: TConfig;
  plugins?: string[];
  archived?: boolean;
  updatedAt?: string;
  createdAt?: string;
};
