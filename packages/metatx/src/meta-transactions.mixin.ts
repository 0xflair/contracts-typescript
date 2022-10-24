import { Environment } from '@flair-sdk/common';
import {
  Contract,
  Contract as EthersContract,
  ContractFunction,
  Signer,
} from 'ethers';
import { defineReadOnly, FunctionFragment } from 'ethers/lib/utils';

import { MetaTransactionsClient } from './meta-transactions.client';
import { MetaTransaction } from './types/meta-transaction';

export type MetaTransactionsAugmentedContract<T extends EthersContract> = T & {
  metaTransaction: { [name: string]: ContractFunction<any> } | T['functions'];
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

    return metaTransactionsClient.submit(chainId, contract.signer, {
      from,
      to: contract.address,
      data: calldata,
    });
  };
}

export const applyMetaTransactions = <T extends EthersContract>(
  contract: T,
  chainId: number,
  metaTransactionsClient: MetaTransactionsClient,
): MetaTransactionsAugmentedContract<T> => {
  const castedContract = contract as MetaTransactionsAugmentedContract<T>;

  castedContract.metaTransaction = {};
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

  return castedContract;
};

export const augmentContractWithMetaTransactions = <
  T extends EthersContract,
>(config: {
  env?: Environment;
  chainId: number;
  flairClientId: string;
  contract: T;
  forwarder: string;
}): MetaTransactionsAugmentedContract<T> => {
  const metaTxClient = new MetaTransactionsClient({
    env: config.env || Environment.PROD,
    flairClientId: config.flairClientId,
    forwarder: config.forwarder,
  });

  const augmentedContract = applyMetaTransactions<T>(
    config.contract,
    config.chainId,
    metaTxClient,
  );

  return augmentedContract;
};
