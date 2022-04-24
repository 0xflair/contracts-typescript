import { FlairInvalidVersionError } from './errors';
import { FlairInvalidArtifactError } from './errors/invalid-artifact';
import { ContractKey, LATEST_VERSION, Version } from './generated-types';
import { REGISTRY } from './registry';

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
