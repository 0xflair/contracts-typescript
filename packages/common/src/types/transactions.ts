import type { TransactionReceipt } from '@ethersproject/providers';
import type { SendTransactionResult } from '@wagmi/core';

export type TransactionData = {
  receipt?: TransactionReceipt;
  response?: SendTransactionResult;
};

export type TransactionListener = (data: TransactionData) => Promise<void>;
