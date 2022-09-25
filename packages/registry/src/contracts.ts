import { BytesLike } from 'ethers';

import { SemanticVersion } from './common';

export type ContractFqn = string;
// examples: flair-sdk:token/ERC1155/ERC1155 openzeppelin:token/ERC1155/ERC1155

export type ContractReference = string;
// examples: flair-sdk:token/ERC1155/ERC1155:^1.2.0

export type ContractAddress = BytesLike;

export type ContractCall = {
  id: string;
  contract?: ContractAddress | null; // Only allow contract address
  function?: string | null;
  args?: any[] | null;
};

export type ContractManifest = {
  fqn: string;
  version?: SemanticVersion;
  address?: Record<string, string>;
  sourceCode?: string;
  artifact?: {
    contractName?: string;
    sourceName?: string;
    abi?: any[];
    bytecode?: string;
  };
};

const CONTRACTS_REGISTRY: ContractManifest[] = [];

export const getContractsRegistry: () => Promise<ContractManifest[]> =
  async function () {
    return CONTRACTS_REGISTRY;
  };

export const generateContractId = (manifest: ContractManifest) => {
  return `${manifest.fqn}:${manifest.version}`;
};

export const registerContract = (contract: ContractManifest) => {
  if (
    CONTRACTS_REGISTRY.find(
      (f) => generateContractId(f) === generateContractId(contract),
    )
  ) {
    console.error(
      `Contract ${generateContractId(contract)} already registered, skipping. `,
      contract,
    );
    return;
  }

  CONTRACTS_REGISTRY.push(contract);
};
