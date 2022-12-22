import { Environment } from '@flair-sdk/common';
import { Contract, Contract as EthersContract, ContractFunction } from 'ethers';
import { defineReadOnly, FunctionFragment } from 'ethers/lib/utils.js';

import { MetaTransactionsClient } from './meta-transactions.client';
import { MetaTransaction } from './types/meta-transaction';

type MetaTransactionTypedFunctions<T extends EthersContract> = Record<
  keyof T['functions'],
  ContractFunction<MetaTransaction>
>;

export type MetaTransactionsAugmentedContract<T extends EthersContract> = T & {
  metaTransaction: MetaTransactionTypedFunctions<T>;
};

export type MetaTransactionsDecoratedContract<T extends EthersContract> = Omit<
  MetaTransactionsAugmentedContract<T>,
  'functions'
> & {
  functions: MetaTransactionTypedFunctions<T>;
};

function buildMetaTransaction(
  chainId: number,
  metaTransactionsClient: MetaTransactionsClient,
  contract: Contract,
  fragment: FunctionFragment,
): ContractFunction<MetaTransaction> {
  return async function (...args: Array<any>): Promise<MetaTransaction> {
    const from = await contract.signer.getAddress();
    const calldata = contract.interface.encodeFunctionData(fragment, args);

    if (fragment.stateMutability === 'view') {
      return contract.callStatic[fragment.name](...args);
    }

    return metaTransactionsClient.submit(chainId, contract.signer, {
      from,
      to: contract.address,
      data: calldata,
    });
  };
}

export function applyMetaTransactions<T extends EthersContract>(
  contract: T,
  chainId: number,
  metaTransactionsClient: MetaTransactionsClient,
  decorate?: false,
): MetaTransactionsAugmentedContract<T>;
export function applyMetaTransactions<T extends EthersContract>(
  contract: T,
  chainId: number,
  metaTransactionsClient: MetaTransactionsClient,
  decorate: true,
): MetaTransactionsDecoratedContract<T>;
export function applyMetaTransactions<T extends EthersContract>(
  contract: T,
  chainId: number,
  metaTransactionsClient: MetaTransactionsClient,
  decorate?: boolean,
): MetaTransactionsAugmentedContract<T> | MetaTransactionsDecoratedContract<T> {
  const castedContract = contract as MetaTransactionsAugmentedContract<T>;

  castedContract.metaTransaction = {} as MetaTransactionTypedFunctions<T>;
  Object.keys(castedContract.interface.functions).forEach((signature) => {
    const fragment = castedContract.interface.functions[signature];

    if (castedContract.metaTransaction[signature] == null) {
      defineReadOnly<any, any>(
        castedContract.metaTransaction,
        signature,
        buildMetaTransaction(
          chainId,
          metaTransactionsClient,
          castedContract,
          fragment,
        ),
      );
    }

    const name = fragment.name;

    if (castedContract.metaTransaction[name] == null) {
      defineReadOnly<any, any>(
        castedContract.metaTransaction,
        name,
        buildMetaTransaction(
          chainId,
          metaTransactionsClient,
          castedContract,
          fragment,
        ),
      );
    }
  });

  if (decorate) {
    defineReadOnly<any, any>(
      castedContract,
      'functions',
      castedContract.metaTransaction,
    );

    return castedContract as MetaTransactionsDecoratedContract<T>;
  } else {
    return castedContract as MetaTransactionsAugmentedContract<T>;
  }
}

export const augmentContractWithMetaTransactions = <
  T extends EthersContract,
>(config: {
  env?: Environment;
  chainId: number;
  flairClientId: string;
  contract: T;
  forwarder: string;
  defaults?: {
    minGasPrice?: string;
    maxGasPrice?: string;
    expiresAt?: number;
  };
}): MetaTransactionsAugmentedContract<T> => {
  const metaTxClient = new MetaTransactionsClient({
    env: config.env || Environment.PROD,
    flairClientId: config.flairClientId,
    forwarder: config.forwarder,
    defaults: config.defaults,
  });

  const augmentedContract = applyMetaTransactions<T>(
    config.contract,
    config.chainId,
    metaTxClient,
  );

  return augmentedContract;
};

export const decorateContractWithMetaTransactions = <
  T extends EthersContract,
>(config: {
  env?: Environment;
  chainId: number;
  flairClientId: string;
  contract: T;
  forwarder: string;
  defaults?: {
    minGasPrice?: string;
    maxGasPrice?: string;
    expiresAt?: number;
  };
}): MetaTransactionsDecoratedContract<T> => {
  const metaTxClient = new MetaTransactionsClient({
    env: config.env || Environment.PROD,
    flairClientId: config.flairClientId,
    forwarder: config.forwarder,
    defaults: config.defaults,
  });

  const decoratedContract = applyMetaTransactions<T>(
    config.contract,
    config.chainId,
    metaTxClient,
    true,
  );

  return decoratedContract;
};
