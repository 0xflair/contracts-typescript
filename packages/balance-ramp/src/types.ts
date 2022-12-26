import { TransactionRequest } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { MetaTransaction } from '@flair-sdk/metatx';
import { BigNumberish } from 'ethers';
import { Deferrable } from 'ethers/lib/utils.js';

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
  ignoreCurrentBalance?: boolean;
  preferredMethod?: string;
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
  ignoreCurrentBalance: boolean;
  inputCurrency?: string;
  resolvers: BalanceResolver[];
  enabledChainIds?: number[] | 'ALL';
  maxGasLimit?: BigNumberish;
  portalElement?: Element;
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
  method:
    | 'sponsor'
    | 'stripe'
    | 'utrust'
    | 'bitpay'
    | 'coinbase'
    | 'on-ramp'
    | 'bridge';
  stripeSessionId: string;
  stripeSessionUrl: string;
  utrustOrderId: string;
  utrustRedirectUrl: string;
  bitpayInvoiceId: string;
  bitpayRedirectUrl: string;
  coinbaseCheckoutId: string;
  coinbaseRedirectUrl: string;
  paymentState: 'created' | 'canceled' | 'failed' | 'processing' | 'paid';
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

export type BalanceRampBackendConfig = {
  stripeEnabled: boolean;
  stripeConfiguredAndActive: boolean;
  utrustEnabled: boolean;
  utrustConfiguredAndActive: boolean;
  bitpayEnabled: boolean;
  bitpayConfiguredAndActive: boolean;
  coinbaseEnabled: boolean;
  coinbaseConfiguredAndActive: boolean;
  canRelayTransaction: boolean;
  paymentRailsSupportedForChainAndToken: boolean;
  onRamperEnabled: boolean;
  onRamperWalletPrefix: string;
  rampNetworkSwapAsset: string;
  rampNetworkEnabled: boolean;
  taxBehavior: TaxBehavior;
  platformFeeBehavior: PlatformFeeBehavior;
  gasFeeBehavior: GasFeeBehavior;
  inputAmountFormatted: number;
  platformFeeBN: BigNumberish;
  platformFeeFormatted: number;
  estimatedGasCostBN: BigNumberish;
  estimatedGasCostFormatted: number;
};

export type BalanceRampRequest = {
  testMode?: boolean;
  method?: BalanceRamp['method'];
  chainId?: number;
  walletAddress?: string;
  idempotencyKey?: string;
  outputTokenAddress?: string;
  outputAmount?: string;
  outputDecimals?: number;
  inputCurrency?: string;
  preferredMethod?: string;
  txFrom?: string;
  txTo?: string;
  txData?: string;
  txValue?: string;
  txGasPrice?: string;
  txGasLimit?: string;
  estimatedGasPrice?: string;
  estimatedMaxFeePerGas?: string;
  estimatedMaxPriorityFeePerGas?: string;
  estimatedGasLimit?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export enum TaxBehavior {
  INCLUSIVE = 'inclusive',
  EXCLUSIVE = 'exclusive',
}

export enum PlatformFeeBehavior {
  INCLUSIVE = 'inclusive',
  EXCLUSIVE = 'exclusive',
}

export enum GasFeeBehavior {
  SPONSORED = 'sponsored',
  SELF_FUNDED = 'self-funded',
}
