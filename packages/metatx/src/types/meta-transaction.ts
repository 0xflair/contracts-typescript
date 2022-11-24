import { Log } from '@ethersproject/providers';
import { StandardError, TransactionEvent } from '@flair-sdk/common';
import { BigNumberish } from 'ethers';

export enum MetaTransactionState {
  CREATED = 'created',
  QUEUED = 'queued',
  ATTEMPTED = 'attempted',
  SUBMITTED = 'submitted',
  PROCESSED = 'processed',
  WAITING = 'waiting',
  MINED = 'mined',
  REVERTED = 'reverted',
  FAILED = 'failed',
}

export type MetaTransaction = {
  id?: string;

  clientId?: string;
  chainId?: number;
  forwarder?: string;
  from?: string;
  to?: string;
  value?: string;
  minGasPrice?: string;
  maxGasPrice?: string;
  expiresAt?: number;
  nonce?: string;
  data?: string;

  signature?: string;

  createdAt?: number; // 0) Create a new meta-transaction in the database
  queuedAt?: number; // 1) Added to the queue
  attemptedAt?: number; // 2) Attempt to send to relayer
  submittedAt: number; // 3) Submitted fully to the relayer
  processedAt?: number; // 4) Relayer accepted the tx and gave us a txHash
  waitAt?: number; // 5) Waiting for transaction to be mined
  minedAt?: number; // 5) Transaction is fully mined

  state?: MetaTransactionState;
  lastError?: StandardError;

  txHash?: string;
  txGasPrice?: string;
  txNonce?: string;
  txReceipt: {
    status: number;
    gasUsed: BigNumberish;
    effectiveGasPrice: BigNumberish;
    blockNumber: BigNumberish;
    blockHash: string;
    confirmations: number;
    logs: Log[];
  };
  events: TransactionEvent[];
};
