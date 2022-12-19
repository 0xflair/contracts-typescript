import { Log } from '@ethersproject/providers';
import { StandardError } from '@flair-sdk/common';
import { BigNumberish } from 'ethers';

import { TransactionEvent } from './transaction-event';

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

export type TransactionReceipt = {
  status: number;
  gasUsed: BigNumberish;
  effectiveGasPrice: BigNumberish;
  blockNumber: BigNumberish;
  blockHash: string;
  confirmations: number;
  logs: Log[];
};

export type CreatedMetaTransactionRequiredFields = {
  state: MetaTransactionState.CREATED;

  clientId: string;
  chainId: number;
  forwarder: string;
  from: string;
  to: string;
  nonce: string;
  signature: string;
  createdAt: number;
};

export type QueuedMetaTransactionRequiredFields = {
  state: MetaTransactionState.QUEUED;

  queuedAt: number;
};

export type AttemptedMetaTransactionRequiredFields = {
  state: MetaTransactionState.ATTEMPTED;

  attemptedAt: number;
};

export type SubmittedMetaTransactionRequiredFields = {
  state: MetaTransactionState.SUBMITTED;

  submittedAt: number;
};

export type ProcessedMetaTransactionRequiredFields = {
  state: MetaTransactionState.PROCESSED;

  txHash: string;
  processedAt: number;
};

export type WaitingMetaTransactionRequiredFields = {
  state: MetaTransactionState.WAITING;

  waitAt: number;
};

export type MinedMetaTransactionRequiredFields = {
  state: MetaTransactionState.MINED;

  minedAt: number;
  txReceipt: TransactionReceipt;
  miningError: null;
};

export type RevertedMetaTransactionRequiredFields = {
  state: MetaTransactionState.REVERTED;

  minedAt: number;
  txReceipt: TransactionReceipt;
  miningError: StandardError;
};

export type FailedMetaTransactionRequiredFields = {
  state: MetaTransactionState.FAILED;

  lastError: StandardError;
};

export type ErrTransactionReverted = {
  code: 'ErrTransactionReverted';
  message: string;
  details: {
    reason?: string;
  };
};

export type ErrTransactionFailed = {
  code: 'ErrTransactionFailed';
  message: string;
  details: {
    reason?: string;
  };
  causes?: StandardError[];
};

export type ErrTransactionSimulationFailedForPossibleRevert = {
  code: 'ErrTransactionSimulationFailed';
  message: string;
  details: {
    reason?: string;
  };
  causes: [ErrTransactionReverted];
};

export type MetaTransactionBase = {
  id: string;

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

  state: MetaTransactionState;
  lastError?:
    | (StandardError & ErrTransactionReverted)
    | (StandardError & ErrTransactionFailed)
    | (StandardError & ErrTransactionSimulationFailedForPossibleRevert);

  txHash?: string;
  txGasPrice?: string;
  txNonce?: string;
  txReceipt?: TransactionReceipt;
  events?: TransactionEvent[];
};

export type MetaTransaction =
  | (MetaTransactionBase & CreatedMetaTransactionRequiredFields)
  | (MetaTransactionBase & QueuedMetaTransactionRequiredFields)
  | (MetaTransactionBase & AttemptedMetaTransactionRequiredFields)
  | (MetaTransactionBase & SubmittedMetaTransactionRequiredFields)
  | (MetaTransactionBase & ProcessedMetaTransactionRequiredFields)
  | (MetaTransactionBase & WaitingMetaTransactionRequiredFields)
  | (MetaTransactionBase & MinedMetaTransactionRequiredFields)
  | (MetaTransactionBase & RevertedMetaTransactionRequiredFields)
  | (MetaTransactionBase & FailedMetaTransactionRequiredFields);
