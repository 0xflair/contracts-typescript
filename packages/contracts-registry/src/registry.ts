import { ContractVersion } from './generated-types';
import RegistryJson from './registry-mapping.json';

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

export type ContractDictionary = Record<string, ContractDefinition>;
export type ContractRegistry = Record<ContractVersion, ContractDictionary>;

export const REGISTRY: ContractRegistry = RegistryJson;
