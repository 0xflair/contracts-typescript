import { Environment } from '@0xflair/common';
import {
  ContractKey,
  LATEST_VERSION,
  Version,
} from '@0xflair/contracts-registry/src/generated-types';
import { loadContract } from '@0xflair/contracts-registry/src/load-contract';
import { Provider } from '@ethersproject/providers';
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
  fragment: FunctionFragment
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

export class MetaContract extends EthersContract {
  readonly metaTransaction!: { [name: string]: ContractFunction };

  constructor(
    metaTransactionsClient: MetaTransactionsClient,
    chainId: number,
    contractKey: ContractKey,
    contractVersion: Version = LATEST_VERSION,
    addressOrName?: string,
    signerOrProvider?: Signer | Provider
  ) {
    const contractDefinition = loadContract(contractKey, contractVersion);
    const contractAddressOrName =
      addressOrName || contractDefinition.address?.[String(chainId)];

    if (!contractAddressOrName) {
      throw new Error(
        `Could not determine contract address from constructor (${addressOrName}) nor from definition (${contractDefinition.address})`
      );
    }

    super(
      contractAddressOrName,
      contractDefinition.artifact.abi,
      signerOrProvider
    );

    Object.keys(this.interface.functions).forEach((signature) => {
      const fragment = this.interface.functions[signature];

      if (this.metaTransaction[signature] == null) {
        defineReadOnly(
          this.metaTransaction,
          signature,
          buildMetaTransaction(chainId, metaTransactionsClient, this, fragment)
        );
      }
    });
  }

  static create<T extends BaseContract>(config: {
    env?: Environment;
    chainId: number;
    flairClientId: string;
    contractKey: ContractKey;
    contractVersion?: Version;
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
      config.contractKey,
      config.contractVersion,
      config.addressOrName,
      config.signerOrProvider
    ) as unknown as T;
  }
}
