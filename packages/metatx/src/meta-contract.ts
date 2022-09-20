import { Provider } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import {
  ContractFqn,
  ContractVersion,
  LATEST_VERSION,
  loadContract,
} from '@flair-sdk/registry';
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
    contractFqn: ContractFqn,
    contractVersion: ContractVersion = LATEST_VERSION,
    addressOrName?: string,
    signerOrProvider?: Signer | Provider,
  ) {
    const contractDefinition = loadContract(contractFqn, contractVersion);
    const contractAddressOrName =
      addressOrName || contractDefinition?.address?.[String(chainId)];

    if (!contractAddressOrName) {
      throw new Error(
        `Could not determine contract address from constructor (${addressOrName}) nor from definition (${contractDefinition?.address})`,
      );
    }

    super(
      contractAddressOrName,
      contractDefinition?.artifact.abi || [],
      signerOrProvider,
    );

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
    contractFqn: ContractFqn;
    contractVersion?: ContractVersion;
    addressOrName?: string;
    signerOrProvider?: Signer | Provider;
  }): T {
    const metaTxClient = new MetaTransactionsClient({
      env: config.env || Environment.PROD,
      chainId: config.chainId,
      flairClientId: config.flairClientId,
    });

    return new MetaContract(
      metaTxClient,
      config.chainId,
      config.contractFqn,
      config.contractVersion,
      config.addressOrName,
      config.signerOrProvider,
    ) as unknown as T;
  }
}
