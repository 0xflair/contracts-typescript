import { FlairInvalidVersionError } from "./errors";
import { REGISTRY } from "./registry";
import { ContractKey, LATEST_VERSION, Version } from "./generated-types";
import { FlairInvalidArtifactError } from "./errors/invalid-artifact";

export const loadContract = (
  contractKey: ContractKey,
  version: Version = LATEST_VERSION
) => {
  if (!REGISTRY[version]) {
    throw new FlairInvalidVersionError(version);
  }

  const contract = REGISTRY[version][contractKey];

  if (!contract) {
    throw new FlairInvalidArtifactError(contractKey, version);
  }

  return contract;
};
