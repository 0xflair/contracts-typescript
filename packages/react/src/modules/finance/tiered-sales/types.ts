import { BigNumberish, BytesLike } from 'ethers';

export type TiersDictionary<T = Tier> = Record<string, T>;

export type Tier = {
  // On-chain
  start: BigNumberish;
  end: BigNumberish;
  currency: BytesLike;
  price: BigNumberish;
  maxPerWallet: BigNumberish;
  merkleRoot: BytesLike;
  reserved: BigNumberish;
  maxAllocation: BigNumberish;

  // Off-chain helpers
  remainingSupply?: BigNumberish;
  isSavedOnChain?: boolean;
  isActive?: boolean;
  hasAllowlist?: boolean;
  metadataUri?: string;
  hideTierForUsers?: boolean;

  // Wallet-specific
  minterAddress?: BytesLike;
  isAllowlisted?: boolean;
  isEligible?: boolean;
  eligibleAmount?: BigNumberish;
};
