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
  throwOnError = true,
) => {
  if (!CONTRACT_REGISTRY[contractVersion]) {
    if (throwOnError) {
      throw new FlairInvalidVersionError(contractVersion);
    } else {
      return undefined;
    }
  }

  const contract = CONTRACT_REGISTRY[contractVersion]?.[contractFqn as string];

  if (!contract) {
    if (throwOnError) {
      throw new FlairInvalidArtifactError(
        contractFqn as string,
        contractVersion,
      );
    } else {
      return undefined;
    }
  }

  return contract;
};
