import { Provider } from '@ethersproject/providers';
import { Contract as EthersContract, Signer } from 'ethers';

import { ContractKey, LATEST_VERSION, Version } from './generated-types';
import { loadContract } from './load-contract';

export class FlairContract extends EthersContract {
  constructor(
    chainId: number,
    contractKey: ContractKey,
    signerOrProvider?: Signer | Provider,
    contractVersion: Version = LATEST_VERSION,
    addressOrName?: string
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
  }
}
