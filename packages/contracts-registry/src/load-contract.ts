import { FlairInvalidVersionError } from './errors';
import { FlairInvalidArtifactError } from './errors/invalid-artifact';
import {
  ContractFqn,
  ContractVersion,
  LATEST_VERSION,
} from './generated-versions';
import { CONTRACT_REGISTRY } from './registry';

export const loadContract = (
  contractFqn: ContractFqn,
  contractVersion: ContractVersion = LATEST_VERSION,
) => {
  if (!CONTRACT_REGISTRY[contractVersion]) {
    throw new FlairInvalidVersionError(contractVersion);
  }

  const contract = CONTRACT_REGISTRY[contractVersion]?.[contractFqn as string];

  if (!contract) {
    throw new FlairInvalidArtifactError(contractFqn as string, contractVersion);
  }

  return contract;
};
