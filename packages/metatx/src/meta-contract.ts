import { Provider } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import {
  BaseContract,
  Contract,
  Contract as EthersContract,
  ContractFunction,
  Signer,
} from 'ethers';
import { defineReadOnly, FunctionFragment } from 'ethers/lib/utils';

import { MetaTransactionsClient } from './meta-transactions.client';
import { MetaTransaction } from './types/meta-transaction';

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

export class MetaContract<
  T extends EthersContract = EthersContract,
> extends EthersContract {
  readonly metaTransaction:
    | { [name: string]: ContractFunction<any> }
    | T['functions'];

  constructor(
    metaTransactionsClient: MetaTransactionsClient,
    chainId: number,
    addressOrName: string,
    abi: any,
    signerOrProvider?: Signer | Provider,
  ) {
    super(addressOrName, abi, signerOrProvider);

    this.metaTransaction = {};
    Object.keys(this.interface.functions).forEach((signature) => {
      const fragment = this.interface.functions[signature];

      if (this.metaTransaction[signature] == null) {
        defineReadOnly<any, any>(
          this.metaTransaction,
          signature,
          buildMetaTransaction(chainId, metaTransactionsClient, this, fragment),
        );
      }

      const name = fragment.name;

      if (this.metaTransaction[name] == null) {
        defineReadOnly<any, any>(
          this.metaTransaction,
          name,
          buildMetaTransaction(chainId, metaTransactionsClient, this, fragment),
        );
      }
    });
  }

  static create<T extends BaseContract>(config: {
    env?: Environment;
    chainId: number;
    flairClientId: string;
    forwarder: string;
    addressOrName: string;
    abi: any;
    signerOrProvider?: Signer | Provider;
    defaults?: {
      minGasPrice?: string;
      maxGasPrice?: string;
      expiresAt?: number;
    };
  }): T {
    const metaTxClient = new MetaTransactionsClient({
      env: config.env || Environment.PROD,
      flairClientId: config.flairClientId,
      forwarder: config.forwarder,
      defaults: config.defaults,
    });

    return new MetaContract(
      metaTxClient,
      config.chainId,
      config.addressOrName,
      config.abi,
      config.signerOrProvider,
    ) as unknown as T;
  }
}
