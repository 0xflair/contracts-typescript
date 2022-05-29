import { Provider } from '@ethersproject/providers';
import { Contract as EthersContract, Signer } from 'ethers';

import {
  ContractFqn,
  ContractVersion,
  LATEST_VERSION,
} from './generated-types';
import { loadContract } from './load-contract';

export class FlairContract extends EthersContract {
  constructor(
    chainId: number,
    contractFqn: ContractFqn,
    signerOrProvider?: Signer | Provider,
    contractVersion: ContractVersion = LATEST_VERSION,
    addressOrName?: string
  ) {
    const contractDefinition = loadContract(contractFqn, contractVersion);
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
