import { BigNumberish, BytesLike } from 'ethers';

export type Tier = {
  start: BigNumberish;
  end: BigNumberish;
  currency: BytesLike;
  price: BigNumberish;
  maxPerWallet: BigNumberish;
  merkleRoot: BytesLike;
  reserved: BigNumberish;
  maxAllocation: BigNumberish;
  isSavedOnChain?: boolean;
};
