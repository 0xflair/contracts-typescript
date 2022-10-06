import { SmartContract } from '@flair-sdk/react';

export type Diamond<TConfig = Record<string, any>> = {
  id?: string;
  ownerAddress?: string;
  chainId?: number;
  contractAddress?: string;
  privateName?: string;
  publicTitle?: string;
  profileImage?: string;
  profileCover?: string;
  profileBio?: string;
  websiteLink?: string;
  twitterLink?: string;
  discordLink?: string;
  otherLinks?: string[];
  smartContract?: SmartContract;
  contractVerification?: any;
  deployTransaction?: string;
  config?: TConfig;
  plugins?: string[];
  archived?: boolean;
  updatedAt?: string;
  createdAt?: string;
};
