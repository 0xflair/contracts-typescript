import { Environment } from '@0xflair/common';
import {
  ContractFqn,
  ContractVersion,
  FlairContract,
} from '@0xflair/contracts-registry';
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

export const createFlairContractWithMetaTransactions = <
  T extends EthersContract,
>(config: {
  env?: Environment;
  chainId: number;
  flairClientId: string;
  contractFqn: ContractFqn;
  contractVersion?: ContractVersion;
  addressOrName?: string;
  signer?: Signer;
  forwarder?: string;
}): T => {
  const metaTxClient = new MetaTransactionsClient({
    env: config.env || Environment.PROD,
    chainId: config.chainId,
    flairClientId: config.flairClientId,
    forwarder: config.forwarder,
  });

  const contract = new FlairContract(
    config.chainId,
    config.contractFqn,
    config.signer,
    config.contractVersion,
    config.addressOrName,
  );

  const augmentedContract = applyMetaTransactions<T>(
    contract as unknown as T, // TODO fix this to get proper typing!
    config.chainId,
    metaTxClient,
  );

  return augmentedContract;
};
