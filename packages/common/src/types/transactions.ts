import { TransactionReceipt } from '@ethersproject/providers';
import type { SendTransactionResult } from '@wagmi/core';

export type TransactionData = {
  receipt?: TransactionReceipt;
  response?: SendTransactionResult;
};

export type TransactionListener = (data: TransactionData) => Promise<void>;

export type EventParameter = {
  name: string;
  type: string;
  value: string;
  formatted?: string;
};

export type TransactionEvent = {
  name: EventName;
  logName: string;
  logTopic: string;
  signature: string;
  args: Record<string, string>;
  details: EventParameter[];
};

export type EventName = string | 'Mint' | 'Burn';
