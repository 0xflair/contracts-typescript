export type MetaTransactionRequest = {
  forwarder?: string;
  from: string;
  to: string;
  value?: string;
  minGasPrice?: string;
  maxGasPrice?: string;
  expiresAt?: number;
  nonce?: string;
  data?: string;
  signature: string;
};
