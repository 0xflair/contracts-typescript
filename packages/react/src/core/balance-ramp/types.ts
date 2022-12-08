import { TransactionRequest } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { MetaTransaction } from '@flair-sdk/metatx';
import { BigNumberish } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';

export type CurrentBalance = {
  tokenAddress: string;
  amount: BigNumberish;
};

export type RequiredBalance = {
  idempotencyKey?: string;
  outputTokenAddress?: string;
  outputDecimals?: number;
  outputAmount: string;
  estimatedGasLimit?: string;
  estimatedGasPrice?: string;
  estimatedMaxFeePerGas?: string;
  estimatedMaxPriorityFeePerGas?: string;
  inputCurrency?: string;
  requiresKyc?: boolean;
  ignoreCurrentBalance?: boolean;
  paymentMethod?: string;
};

export type BalanceResolverContext = {
  config: BalanceRampConfig;
  estimatedGasLimit?: BigNumberish;
  estimatedGasPrice?: BigNumberish;
  estimatedMaxFeePerGas?: BigNumberish;
  estimatedMaxPriorityFeePerGas?: BigNumberish;
  transactionRequest?: Deferrable<TransactionRequest>;
};

export type BalanceResolver = (
  context: BalanceResolverContext,
) => Promise<RequiredBalance | undefined>;

export type BalanceRampConfig = {
  env: Environment;
  requiresKyc: boolean;
  ignoreCurrentBalance: boolean;
  inputCurrency?: string;
  resolvers: BalanceResolver[];
  enabledChainIds?: number[] | 'ALL';
  maxGasLimit?: BigNumberish;
};

export type BalanceRamp = {
  id: string;
  chainId: number;
  walletAddress: string;
  outputTokenAddress: string;
  outputDecimals: number;
  outputAmount: string;
  inputCurrency: string;
  inputAmount: string;
  platformFee: string;
  gasCost: string;
  requiresKyc: boolean;
  txFrom: string;
  txTo: string;
  txData: string;
  txValue: string;
  txGasLimit: string;
  txGasPrice: string;
  estimatedGasPrice: string;
  estimatedMaxFeePerGas: string;
  estimatedMaxPriorityFeePerGas: string;
  estimatedGasLimit: string;
  title: string;
  method: 'stripe' | 'utrust' | 'bitpay' | 'coinbase' | 'on-ramp' | 'bridge';
  stripeSessionId: string;
  stripeSessionUrl: string;
  utrustOrderId: string;
  utrustRedirectUrl: string;
  paymentState: 'created' | 'processing' | 'paid' | 'canceled' | 'failed';
  settlementState:
    | 'idle'
    | 'processing'
    | 'submitted'
    | 'waiting'
    | 'settled'
    | 'failed';
  settlementRelayId: string;
  settlementRelayMetaTx: MetaTransaction;
  settlementWillDepositBalance: boolean;
  processingError: string;
};
