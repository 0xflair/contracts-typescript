import { Version } from './generated-types';
import RegistryJson from './registry-mapping.json';

export type ContractDefinition = {
  artifact: {
    contractName: string;
    sourceName: string;
    bytecode: string;
    abi: any[];
  };
  source?: string;
};

export type ContractDictionary = Record<string, ContractDefinition>;
export type ContractRegistry = Record<Version, ContractDictionary>;

export const REGISTRY: ContractRegistry = RegistryJson;
