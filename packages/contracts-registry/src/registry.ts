import BuildInfoJson from './build-info.json';
import FacetsJson from './facets.json';
import { ContractFqn, ContractVersion } from './generated-versions';
import ContractRegistryJson from './registry-mapping.json';
import { FacetManifest } from './types';

export type ContractDefinition = {
  address?: {
    [key: string]: string;
  };
  artifact: {
    contractName: string;
    sourceName: string;
    bytecode: string;
    abi: any[];
  };
  source?: string;
};

export type BuildInfo = {
  compilerVersion?: string;
  solcInput?: {
    language: string | 'Solidity';
    sources: {
      [key: string]: { content: string };
    };
  };
};

export type ContractDictionary = Partial<
  Record<ContractFqn, ContractDefinition>
>;
export type ContractRegistry = Partial<
  Record<ContractVersion, ContractDictionary>
>;
export type FacetDictionary = Partial<Record<ContractFqn, FacetManifest>>;
export type FacetRegistry = Partial<Record<ContractVersion, FacetDictionary>>;
export type BuildInfoRegistry = Partial<Record<ContractVersion, BuildInfo>>;

export const FACET_REGISTRY: FacetRegistry = FacetsJson;
export const CONTRACT_REGISTRY: ContractRegistry = ContractRegistryJson;
export const BUILD_INFO_REGISTRY: BuildInfoRegistry = BuildInfoJson;
