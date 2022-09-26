import { SemanticVersion } from './common';
import { ContractReference } from './contracts';
import { compareSemanticVersion } from './util';

export type FacetFqn = string;
// examples: flair-sdk:token/ERC1155/ERC1155 openzeppelin:token/ERC1155/ERC1155

export type FacetReference = string;
// examples: flair-sdk:token/ERC1155/ERC1155:^1.2.0

export type EIP165InterfaceID = string;
// examples: 0x80ac58cd

export type SourceReference = string;
// examples: git+ssh://github.com/flair-dao/contracts.git#my-branch   ...   npm:@flair-sdk/contracts@1.0.0

export type FunctionSignatureHash = string;
// examples: 0x80ac58cd

export type FunctionSignatureShorthand = string;
// examples: transfer(address,uint256)

export type FacetManifest = {
  // Mandatory
  addresses: Record<string, string>;
  functionSelectors: (FunctionSignatureHash | FunctionSignatureShorthand)[];

  // Recommended
  fqn?: FacetFqn;
  version?: SemanticVersion;
  providesInterfaces?: EIP165InterfaceID[];
  peerDependencies?: (EIP165InterfaceID | FacetReference)[];
  requiredDependencies?: (EIP165InterfaceID | FacetReference)[];

  // Informational
  category?: string;
  title?: string;
  author?: string;
  notice?: string;
  icon?: string;
  source?: string;
};

const FACETS_REGISTRY: FacetManifest[] = [];

export const generateFacetId = (manifest: FacetManifest) => {
  return `${manifest.fqn}:${manifest.version}`;
};

export const getFacetsRegistry: () => FacetManifest[] = () => {
  return FACETS_REGISTRY;
};

export const registerFacet = (facet: FacetManifest) => {
  if (
    FACETS_REGISTRY.find((f) => generateFacetId(f) === generateFacetId(facet))
  ) {
    console.error(
      `Facet ${generateFacetId(facet)} already registered, skipping. `,
      facet,
    );
    return;
  }

  FACETS_REGISTRY.push(facet);
};

export const findFacetByReference = (
  reference: ContractReference,
): FacetManifest => {
  // Handle scope:path:exact-version flair-sdk:token/ERC1155/ERC1155:1.2.0
  const registry = getFacetsRegistry();
  const [scope, path, versionTarget] = reference.split(':');

  if (scope && path && versionTarget) {
    if (versionTarget.match(/^\d+\.\d+\.\d+$/)) {
      const contract = registry.find(
        (c) => c.fqn === `${scope}:${path}` && c.version === versionTarget,
      );

      if (contract) {
        return contract;
      }

      throw new Error(
        `Facet ${reference} not found in registry (tried exact version match). Please make sure it is registered.`,
      );
    }
  }

  // Handle scope:path:<no-version> flair-sdk:token/ERC1155/ERC1155
  if (scope && path && !versionTarget) {
    const contracts = registry.filter((c) => c.fqn === `${scope}:${path}`);
    const latestVersion = contracts.sort((a, b) =>
      a.version && b.version ? compareSemanticVersion(a.version, b.version) : 0,
    )[0];

    if (latestVersion) {
      return latestVersion;
    }

    throw new Error(
      `Facet ${reference} not found in registry (tried latest version). Please make sure it is registered.`,
    );
  }

  // TODO handle scope:path:caret-version flair-sdk:token/ERC1155/ERC1155:^1.2.0
  // TODO handle scope:path:wildcard-version flair-sdk:token/ERC1155/ERC1155:1.*

  throw new Error(`Cannot resolve contract reference: ${reference}`);
};
