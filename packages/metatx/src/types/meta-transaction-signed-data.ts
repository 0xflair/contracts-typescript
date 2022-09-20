import { BigNumberish, BytesLike } from 'ethers';

export type MetaTransactionSignedData = {
  from: string;
  to: string;
  value: BigNumberish;
  minGasPrice: BigNumberish;
  maxGasPrice: BigNumberish;
  expiresAt: BigNumberish;
  nonce: BigNumberish;
  data: BytesLike;
};
