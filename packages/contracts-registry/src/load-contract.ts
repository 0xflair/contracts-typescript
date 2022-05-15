import { FlairInvalidVersionError } from './errors';
import { FlairInvalidArtifactError } from './errors/invalid-artifact';
import {
  ContractFqn,
  ContractVersion,
  LATEST_VERSION,
} from './generated-types';
import { CONTRACT_REGISTRY } from './registry';

export const loadContract = (
  contractFqn: ContractFqn,
  version: ContractVersion = LATEST_VERSION
) => {
  if (!CONTRACT_REGISTRY[version]) {
    throw new FlairInvalidVersionError(version);
  }

  const contract = CONTRACT_REGISTRY[version][contractFqn as string];

  if (!contract) {
    throw new FlairInvalidArtifactError(contractFqn as string, version);
  }

  return contract;
};
