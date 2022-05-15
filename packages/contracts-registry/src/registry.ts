import BuildInfoJson from './build-info.json';
import { ContractVersion } from './generated-types';
import ContractRegistryJson from './registry-mapping.json';

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

export type ContractDictionary = Record<string, ContractDefinition>;
export type ContractRegistry = Partial<
  Record<ContractVersion, ContractDictionary>
>;
export type BuildInfoRegistry = Partial<Record<ContractVersion, BuildInfo>>;

export const CONTRACT_REGISTRY: ContractRegistry = ContractRegistryJson;
export const BUILD_INFO_REGISTRY: BuildInfoRegistry = BuildInfoJson;
