import { BytesLike, ethers } from 'ethers';
import _ from 'lodash';

import { SemanticVersion } from './common';
import { compareSemanticVersion } from './util';

export type ContractFqn = string;
// examples: flair-sdk:token/ERC1155/ERC1155 openzeppelin:token/ERC1155/ERC1155

export type ContractReference = string;
// examples: flair-sdk:token/ERC1155/ERC1155:^1.2.0

export type ContractAddress = BytesLike;

export type ContractCall = {
  id: string;
  contract?: ContractAddress | null; // Only allow contract address
  interface?: string | ethers.utils.Interface | any[];
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

export const getContractsRegistry: () => ContractManifest[] = () => {
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
    console.log(
      `Contract ${generateContractId(contract)} already registered, skipping. `,
      contract,
    );
    return;
  }

  CONTRACTS_REGISTRY.push(contract);
};

export const findContractByReference = (
  reference: ContractReference,
): ContractManifest => {
  // Handle scope:path:exact-version flair-sdk:token/ERC1155/ERC1155:1.2.0
  const registry = getContractsRegistry();
  const [scope, path, versionTarget] = reference.split(':');

  if (scope && path && versionTarget) {
    if (versionTarget.match(/^\d+\.\d+\.\d+$/)) {
      const contract = registry.find(
        (c) => c.fqn === `${scope}:${path}` && c.version === versionTarget,
      );

      if (contract) {
        return contract;
      }

      throw new Error(
        `Contract ${reference} not found in registry (tried exact version match). Please make sure it is registered.`,
      );
    }
  }

  // Handle scope:path:<no-version> flair-sdk:token/ERC1155/ERC1155
  if (scope && path && !versionTarget) {
    const contracts = registry.filter((c) => c.fqn === `${scope}:${path}`);
    const latestVersion = contracts.sort((a, b) =>
      a.version && b.version ? compareSemanticVersion(a.version, b.version) : 0,
    )[0];

    if (latestVersion) {
      return latestVersion;
    }

    throw new Error(
      `Contract ${reference} not found in registry (tried latest version). Please make sure it is registered.`,
    );
  }

  // TODO handle scope:path:caret-version flair-sdk:token/ERC1155/ERC1155:^1.2.0
  // TODO handle scope:path:wildcard-version flair-sdk:token/ERC1155/ERC1155:1.*

  throw new Error(`Cannot resolve contract reference: ${reference}`);
};
