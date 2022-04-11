import { Version } from "./versions";
import { CONTRACTS_V_1_3 } from "./versions/v1.3";

export type ContractDefinition = {
    artifact: {
        contractName: string;
        sourceName: string;
        bytecode: string;
        abi: any[];
    };
    source?: string;
};
type ContractDictionary = Record<string, ContractDefinition>;
type ContractRegistry = Record<Version, ContractDictionary>;

export const REGISTRY: ContractRegistry = {
  [Version.v1_3]: CONTRACTS_V_1_3,
};
