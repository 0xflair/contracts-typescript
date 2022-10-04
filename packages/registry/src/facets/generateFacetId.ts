import { encodeFunctionSignature } from '../util';
import { FacetManifest } from './types';

export const generateFacetId = (manifest: FacetManifest) => {
  if (manifest.fqn && manifest.version) {
    return `${manifest.fqn}@${manifest.version}`;
  }

  if (manifest.addresses) {
    // Merge key and values in manifest.addresses and create a sorted array of strings
    const addresses = Object.entries(manifest.addresses)
      .map(([key, value]) => `${key}:${value}`.toLowerCase())
      .sort();

    return addresses.join(',');
  }

  if (manifest.functionSelectors) {
    const functionSelectors = manifest.functionSelectors.sort();

    return encodeFunctionSignature(functionSelectors.join(','));
  }

  throw new Error(
    'Facet manifest must have either fqn and version, or addresses, or functionSelectors',
  );
};
