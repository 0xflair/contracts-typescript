import { FlairInvalidVersionError } from './errors';
import { FlairInvalidArtifactError } from './errors/invalid-artifact';
import {
  ContractFqn,
  ContractVersion,
  LATEST_VERSION,
} from './generated-versions';
import { FACET_REGISTRY } from './registry';

export const getFacetManifest = (
  contractFqn: ContractFqn,
  contractVersion: ContractVersion = LATEST_VERSION,
  throwOnError = true,
) => {
  if (!FACET_REGISTRY[contractVersion]) {
    if (throwOnError) {
      throw new FlairInvalidVersionError(contractVersion);
    } else {
      return undefined;
    }
  }

  const contract = FACET_REGISTRY[contractVersion]?.[contractFqn];

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
