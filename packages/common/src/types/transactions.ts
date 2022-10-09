import { TransactionReceipt } from '@ethersproject/providers';
import { SendTransactionResult } from '@wagmi/core';

export type TransactionData = {
  receipt?: TransactionReceipt;
  response?: SendTransactionResult;
};

export type TransactionListener = (data: TransactionData) => Promise<void>;
